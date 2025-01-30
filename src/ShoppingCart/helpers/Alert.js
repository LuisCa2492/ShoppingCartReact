export const Alert = (title,html,icon,timer = 2000) =>{
    return Swal.fire({
        title: '',
        html: html,
        icon: icon,
        timer: timer,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
        position: 'top-end',
        
    });
}