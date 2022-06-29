const calendar = new CalendarVanillaJs("calendar", "turnoModal");

alert(`Esta es la versión alpha de esta aplicación
Por ahora solo hace la suma de las horas trabajadas y de los partidos
Para usarla, pincha el día en el calendario, rellena la forma que aparece, pincha en save changes
Cuando hayas terminado de introducir todos los días presiona el botón de calcular
Aparecerá una ventana como está con las horas y la cantidad de partidos en el mes

Aún queda mucho por hacer tanto visualmente como en el código si tienes alguna sugerencia o encuentras algún bug contactadme`)
const parseTimeAndFormat = function (timeToParse) {
    const parsedTime = moment(`1989-08-23 ${timeToParse}`, `YYYY-MM-DD HH:mm`)
    return parsedTime.format("HH:mm")
};

const parseTime = function (timeToParse) {
    //parse a string into a date format using moments
    const parsedTime = moment(`1989-08-23 ${timeToParse}`, `YYYY-MM-DD HH:mm`)
    return parsedTime
};

const getDuration = function (time1, time2) {
    let x = parseTime(time1);
    let y = parseTime(time2)
    let diference = x.diff(y) //diference es una diferencia en milisegundos
    if (diference < 0) {

        let result = moment.duration(diference)

        return `${result.as("minutes")}`
    };
    if (diference > 0) {
        x = moment(`1989-08-23 ${time1}`, `YYYY-MM-DD HH:mm`);
        y = moment(`1989-08-24 ${time2}`, `YYYY-MM-DD HH:mm`)

        newdiff = x.diff(y)
        let result = moment.duration(newdiff);
        return `${result.as("minutes")}`
    }
};

// funcion que agrega la funcionalidad de activacion y desactivacion del modal cuando se cambia el mes
function modalActivation() {
    const allCels = document.querySelectorAll(".grid-cell-body");
    for (cell of allCels) {
        cell.dataset.bsToggle = "modal"
        // data-bs-target
        cell.dataset.bsTarget = "#turnoModal"
    }
};

// la llamo sola para que corra la primera vez siempre
modalActivation()


// agregando el escuchador de eventos para que cuando se cambie de mes el modal funcione tambien
const todosBotones = document.querySelectorAll("button")
todosBotones.forEach((boton) => {

    if (boton.classList.contains("control")) {
        boton.addEventListener("click", (event) => {
            modalActivation()
        })
    }
});


// aprovechar el evento disparado por la clase calendar
// calendar.getElement().addEventListener("change", (event) => {
//     // console.log(calendar.value())
//     // console.log(calendar.value().format("LLL"))
// })

// funcion que saca del modal los valores de las horas
function getTurnsHours() {
    const modalForm = document.querySelector("#forma");
    let iniTur_1 = modalForm.iniTur_1.value;
    let finiTur_1 = modalForm.finTur_1.value;
    let iniTur_2 = modalForm.iniTur_2.value;
    let finiTur_2 = modalForm.finTur_2.value;
    return { iniTur_1, finiTur_1, iniTur_2, finiTur_2 }

}

// funcion que borra los valores de la forma del modal
function cleanTurnHours() {
    const modalForm = document.querySelector("#forma");
    modalForm.iniTur_1.value = "";
    modalForm.finTur_1.value = "";
    modalForm.iniTur_2.value = "";
    modalForm.finTur_2.value = "";
}

// objeto en el cual voy a guardar cosas importantes
const horario = {
};

// funcion que toma los valores de la forma y crea el html para que aparezcan en la pagina
function turnoComponente(iniTur_1, finiTur_1, iniTur_2, finiTur_2) {

    // si no hay valores en la segunda parte del turno corre esto
    if (!iniTur_2 && !finiTur_2) {

        const result = `
            <div class="row my-2">
                <div class="col-auto mr-auto">
                    <p> 
                        ${calendar.value().format("D MMM")}
                    </p>
                </div>

                <div class="col-auto">
                    <label class="">Inicio turno 1</label>
                    <input value=${iniTur_1} name=${calendar.value().format("D")}turno1Ini type="time" class="form-control">
                </div>
                <div class="col-auto">
                    <label class="">Fin turno 1</label>
                    <input value=${finiTur_1} name=${calendar.value().format("D")}turno1Fini type="time" class="form-control">
                </div>
            </div>
        `
        // creacion de los key value del objeto horarios
        const turnos = {
            "iniTur1": iniTur_1,
            "finiTur1": finiTur_1,
            "duracion": -(parseInt(getDuration(iniTur_1, finiTur_1)))
        }

        horario[`${calendar.value().format("D")}`] = turnos
        // console.log(horario)

        return result;

    }

    // else corre esto
    const result = `
        <div class="row my-2">
            <div class="col-auto mr-auto">
                <p> 
                    ${calendar.value().format("D MMM")}
                </p>
            </div>
            <div class="col-auto">
                <label class="">Inicio turno 1</label>
                <input value=${iniTur_1} name=${calendar.value().format("D")}turno1Ini type="time" class="form-control">
            </div>
            <div class="col-auto">
                <label class="">Fin turno 1</label>
                <input value=${finiTur_1} name=${calendar.value().format("D")}turno1Fini type="time" class="form-control">
            </div>
            <div class="col-auto mr-auto">
                <label class="">Inicio turno 2</label>
                <input value=${iniTur_2} name=${calendar.value().format("D")}turno2Ini type="time" class="form-control">
            </div>
            <div class="col-auto mr-auto">
                <label class="">Fin turno 2</label>
                <input value=${finiTur_2} name=${calendar.value().format("D")}turno2Fini type="time" class="form-control">
            </div>
        </div>
    `
    // creacion de los key value del objeto horarios
    const turnos = {
        "iniTur1": iniTur_1,
        "finiTur1": finiTur_1,
        "iniTur2": iniTur_2,
        "finiTur2": finiTur_2,
        "duracion": -(parseInt(getDuration(iniTur_1, finiTur_1)) + parseInt(getDuration(iniTur_2, finiTur_2))),
        "partido": true
    }
    horario[`${calendar.value().format("D")}`] = turnos

    // console.log(horario)

    return result
}

// escuchador de eventos que se activa cuando se presiona el boton de la forma del modal
document.querySelector("#saveBtn").addEventListener("click", (event) => {

    let { iniTur_1, finiTur_1, iniTur_2, finiTur_2 } = getTurnsHours()

    const result = document.querySelector("#resultados");
    let newResult = document.createElement("div")
    newResult.innerHTML = turnoComponente(iniTur_1, finiTur_1, iniTur_2, finiTur_2)
    // newResult.innerHTML = `Turno 1: ${iniTur_1}
    // turno 1 fin ${finiTur_1}`
    result.appendChild(newResult)
    cleanTurnHours()
    // console.log(modalForm.IniTur_1.value)
    // console.log(calendar.value().format("LLL"))
})

// escuchador de eventos para mostrar el resultado final cuando se ha terminado de introducir los datos
document.querySelector("#resultados").addEventListener("submit", e => {
    e.preventDefault();
    // console.log(horario)
    let contadorMinutos = 0;
    let contadorPartidos = 0;
    for (let [dia, datos] of Object.entries(horario)) {
        // dia se puede usar despues para definir feriados etc
        contadorMinutos = contadorMinutos + parseInt(datos.duracion);
        if (datos.partido) {
            contadorPartidos++
        }
    }

    console.log(contadorMinutos / 60, contadorPartidos)

    alert(`Has trabajado ${contadorMinutos / 60} horas y has tenido ${contadorPartidos} partidos este mes`)

})

// from mdn docs
// // iterate through key-value gracefully
// var obj = {a: 5, b: 7, c: 9};
// for (var [key, value] of Object.entries(obj)) {
//     console.log(key + ' ' + value); // "a 5", "b 7", "c 9"
// }

// // Or, using array extras
// Object.entries(obj).forEach(([key, value]) => {
//     console.log(key + ' ' + value); // "a 5", "b 7", "c 9"
// });
