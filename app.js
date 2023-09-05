document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }





    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc')
    const inputAsunto = document.querySelector('#asunto');
    const inputOtros = document.querySelector('#otros');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const fieldset = document.querySelector('#fieldset-form')

    console.log(fieldset)

    inputEmail.addEventListener('blur', validar);
    inputCC.addEventListener('blur', validarEmail2);
    inputAsunto.addEventListener('blur', validar);
    inputOtros.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);


    btnReset.addEventListener('click', function (e) {
        e.preventDefault()

        //Reinciar el objeto
        resetform()

    })

    function enviarEmail(e) {
        e.preventDefault()

        spinner.classList.add('margin-top')
        spinner.classList.remove('hidden')

        setTimeout(() => {
            spinner.classList.remove('margin-top')
            spinner.classList.add('hidden')

            //Reinciar el objeto
            resetform()
            const alertaExito = document.createElement('P');
            alertaExito.textContent = 'El Email se ha Enviado con Exito'
            alertaExito.classList.add('exito')

            fieldset.appendChild(alertaExito)

            setTimeout(() => {
                alertaExito.remove('exito')
            }, 3000)

        }, 3000)
    }

    function validar(e) {


        if (e.target.value.trim() === '') {
            alertaHtml(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return; // detiene la ejecucion del codigo
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            alertaHtml('El Email no es Válido', e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }



        //Limpiamos la alerta 
        limpiarAlerta(e.target.parentElement);



        //Asignar los valores
        email[e.target.id] = e.target.value.trim().toLowerCase()

        //Comprobar el objeto de email
        comprobarEmail()

    }

    function validarEmail2(e) {
        if (!validarEmail(e.target.value) && e.target.value.trim() !== '') {
            alertaHtml('El Email no es Válido', e.target.parentElement);
            btnSubmit.classList.add('opacity');
            btnSubmit.disabled = true;
        } else {
            limpiarAlerta(e.target.parentElement);
            comprobarEmail();
        }
    }



    function alertaHtml(mensaje, referencia) {

        //Comprueba si ya existe una alerta
        limpiarAlerta(referencia)
        //Generar Alerta
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('error');

        referencia.appendChild(error)
    }



    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.error')
        if (alerta) {

            alerta.remove()
        }

    }



    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        return resultado
    }



    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity');
        btnSubmit.disabled = false;
    }





    function resetform() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }




})