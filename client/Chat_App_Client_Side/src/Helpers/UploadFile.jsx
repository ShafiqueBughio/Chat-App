const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`




const UploadFile = async(file)=>{
    const formData = new FormData();

    formData.append('file',file);

    formData.append("upload_preset","Chat_App_File");   //zaxlg6sv  -> folder name

    const response = await fetch(url,{
        method:"post",
        body:formData
    })

    const responseData = await response.json();

    return responseData;
}

export default UploadFile