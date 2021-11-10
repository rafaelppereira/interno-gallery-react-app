import { useState, useEffect, FormEvent } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';

import { PhotoItem } from './components/PhotoItem';

import { Photo } from './types/photo';

import { Toaster, toast } from 'react-hot-toast';

const App = () => {

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, [])

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false);

      if (result instanceof Error) {
        // alert(`${result.name} - ${result.message}`);
        toast.error("Arquivo não permitido")
      } else {
        // Adiciona na lista
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
        toast.success('Foto Adicionada com sucesso!')
      }
    }
  }

  return (
    <>
    <C.Container>
      <C.Area>
        <C.Header>Galeria de Fotos</C.Header>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && "Enviando..."}
        </C.UploadForm>

        {loading && 
          <C.ScreenWarning>
            <div className="emoji">🤚</div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        }

        {!loading && photos.length > 0 && 
          <C.PhotoList>
            {photos.map((item, index)=>(
              <PhotoItem key={index} url={item.url} name={item.name} />
            ))}
          </C.PhotoList>
        }

        {!loading && photos.length === 0 && 
          <C.ScreenWarning>
            <div className="emoji">😔</div>
            <div>Não há fotos cadastradas.</div>
          </C.ScreenWarning>
        }
      </C.Area>
    </C.Container>
    <div>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
    </>
  );
}

export default App;