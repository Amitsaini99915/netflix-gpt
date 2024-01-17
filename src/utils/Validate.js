const CheckValidateData = (email, password)=>{
    const Email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const Password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if (!Email) {
        return "email is not valid"
    }
    if(!Password){
        return "password is not vaild"
    }
    return null;
}
export default CheckValidateData;