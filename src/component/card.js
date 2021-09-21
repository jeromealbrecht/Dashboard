import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { doc, setDoc, getDoc } from "firebase/firestore";
import img from '../images/img_191.jpg';
import { useForm } from "react-hook-form";
import ImageUpload from 'image-upload-react';

// https://firebase.google.com/docs/firestore/quickstart?hl=es#initialize

// Initialize Cloud Firestore through Firebase

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseApp = initializeApp({

  apiKey: 'AIzaSyDYRZBURVTMEMq7bEYMqaTmhm6b5sHxJmw',

  authDomain: 'backad-59c60.firebaseapp.com',

  projectId: 'backad-59c60'

});


const db = getFirestore();

export default function MediaCard() {

  const [value, setValue] = useState('');
  const [formdata, setFdata] = useState(''); // recover form data
  const [title, setTitle ] = useState('');
  const [describe, setDesc ] = useState('');
  const [category, setCategory] = useState('');
  const [edit, setEdit ] = useState(false);
  const [imageURL, setImage] = useState('');
  const [imageSrc, setImageSrc] = useState(); // form image source


// write values to firebase database

  // const addTodo = async () => {
  //   await setDoc(doc(db, "User", "user000"), {
  //     category: 'categorie', 
  //     title: title,
  //     describe: 'describe',
  //     imageURL: imageSrc ?? '',
  //   });
  // }

  // useEffect(() => {
  //   addTodo();
  // }, []);



// backdata and push into an array
  const getUser = async () => {
    
    const list = [];
    const docRef = doc(db, "User", "user000");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    list.push(docSnap.data());
    setValue(list);
    setTitle(list[0].title);
    setDesc(list[0].describe);
    setImage(list[0].imageURL);
    setCategory(list[0].category);
    console.log('desc', list[0].describe);
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getUser();
  }, []);

// edit button to call form
function HandleEdit(){
  setEdit(true)
}

const { register, handleSubmit, formState: { errors } } = useForm();
const onSubmit = data => setFdata(data);


// formadata content form values 
// useEffect(() => {
//   setTitle(formdata.title);
// }, [formdata.title]);

console.log('form', formdata);


const handleImageSelect = (e) => {
  setImageSrc(URL.createObjectURL(e.target.files[0]))
}
console.log(imageSrc);

// css
const classes = useStyles();
  return (
    (edit===false) ?
      <Card className="editCard">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          // image="src\image\img_191.jpg"
          title="Contemplative Reptile"
          image={img}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h5">
           {title}
          </Typography>
          <Typography variant="body2" color="textSuccess" component="h5">
           {describe}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="#FFFFFF" onClick={HandleEdit}>
          Modifier
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    :
    <form onSubmit={handleSubmit(onSubmit)}>

    <Card className="editCard">
    <CardActionArea>
      <CardMedia
        className={classes.media}
        title="Contemplative Reptile"
        image={img}
      />
      <CardContent>
        {/* register your input into the hook by invoking the "register" function */}

        {/* Data modification form,Formulaire de modification des données */}

    <input defaultValue={title} style={{width: 200, height: 30, marginBottom: 5}} {...register("title")} />
    <input defaultValue={category} style={{width: 200, height: 30, marginBottom: 5}} {...register("Category")} />
        <Typography variant="body2" color="textSecondary" component="p">
     {/* include validation with required or other standard HTML validation rules */}
    <textarea placeholder={describe} defaultValue={value[0].describe} style={{width: 200, height: 30, marginBottom: 5, color: 'red'}} {...register("Description")} />
    {/* errors will return when field validation fails  */}
    {errors.exampleRequired && <span>This field is required</span>}
        </Typography>

        <div>    
      <ImageUpload
        handleImageSelect={handleImageSelect}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        style={{
          width: 100,
          height: 100,
          background: 'gold'
        }}
      />
    </div>

      </CardContent>
    </CardActionArea>
    <CardActions>
    <input type="submit" />



    </CardActions>
  </Card>
  
  </form>

  
    
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 285,
    maxHeight: 285,
    backgroundColor: "#B35029"
  },
  media: {
    marginTop: 0,
    width: "100%",
    height: 150,
    borderRadius: 0,
  },
});