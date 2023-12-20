export function validate(email:string, name:string){
    
    let errors: {email?: string; name?: string} = {}

   if (!email) {
       errors.email = "Email is required"
   } else if (!email.includes("@")) {
       errors.email = "Please enter a valid email address"
   }
   //se email for nulo, sinaliza o erro de que é necessário o email, se não houver um @,
   //sinaliza que o email é inválido

   if (!name) {
       errors.name = "Name is required"
   }
   //se name for nulo, sinaliza que é necessário inserir um nome
   
   return Object.keys(errors).length ? errors : null  
       //se houver um erro no email ou no name, length > 1, então ele mostra o erro,
       //caso contrário, errors = null
}