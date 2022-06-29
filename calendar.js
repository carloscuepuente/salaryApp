class CalendarVanillaJs {
    constructor(containerId, modalcontainerId) {
        this.cells = []
        this.currentMonth = moment()
        this.selectedDate = null
        // contenedor del calendario en el html
        this.containerId = document.getElementById(containerId);
        // contenedor del modal
        // this.modalcontainerId = document.getElementById(modalcontainerId)
        // console.log(this.modalcontainerId)

        this.showTemplate()
        // contenedor de las celdas del calendario dentro del containerId
        this.datesGridContainer = this.containerId.querySelector(".grid-body");
        // contenedor del nombre de los meses
        this.monthNameContainer = this.containerId.querySelector(".month-name");

        this.showCells()
        // this.addEventDispatcherToButton()
    }

    // regresa un array que tiene las fechas que van a ir al calendario del current month
    genDates(currentMonth = moment()) {
        if (!moment.isMoment(currentMonth)) {
            return null;
        };

        let dateStart = moment(currentMonth).startOf("month");
        let dateEnd = moment(currentMonth).endOf("month");
        let cells = [];

        // fecha del primer lunes de la grilla
        while (dateStart.day() !== 1) {
            dateStart.subtract(1, "days");
        };
        // console.log(dateStart)
        // fecha del ultimo domimgo de la grilla
        while (dateEnd.day() !== 0) {
            dateEnd.add(1, "days");
        };
        // console.log(dateEnd)
        for (let i = 0; i <= 34; i++) {
            cells.push({
                date: moment(dateStart),
                isCurrentMonth: dateStart.month() === currentMonth.month()
            });
            dateStart.add(1, "days")
        }

        // console.log(cells)

        return cells

    }


    showTemplate() {
        this.containerId.innerHTML = `
        <div class="header">
        
                        <button type="button" class="control control-prev">Prev</button>
        
                        <span class="month-name">feb 2030</span>
        
                        <button type="button" class="control control-next">Next</button>
        
                    </div>
        
        
                    <div class="calendar-body">
        
                        <div class="grid-header">
                            <span class="grid-cell grid-cell-header">Lun</span>
                            <span class="grid-cell grid-cell-header">Mar</span>
                            <span class="grid-cell grid-cell-header">Mié</span>
                            <span class="grid-cell grid-cell-header">Jue</span>
                            <span class="grid-cell grid-cell-header">Vie</span>
                            <span class="grid-cell grid-cell-header">Sab</span>
                            <span class="grid-cell grid-cell-header">Dom</span>
                        </div>
        
                        <div class="grid-body">
        
                            <span class="grid-cell grid-cell-body grid-cell-body-selected">1</span>
                            <span class="grid-cell grid-cell-body">2</span>
                            <span class="grid-cell grid-cell-body">3</span>
                            <span class="grid-cell grid-cell-body">4</span>
                            <span class="grid-cell grid-cell-body">5</span>
                            <span class="grid-cell grid-cell-body">6</span>
                            <span class="grid-cell grid-cell-body">7</span>
                            <span class="grid-cell grid-cell-body">8</span>
                            <span class="grid-cell grid-cell-body">9</span>
                            <span class="grid-cell grid-cell-body">10</span>
                            <span class="grid-cell grid-cell-body">11</span>
                            <span class="grid-cell grid-cell-body">12</span>
                            <span class="grid-cell grid-cell-body">13</span>
                            <span class="grid-cell grid-cell-body">14</span>
                            <span class="grid-cell grid-cell-body">15</span>
                            <span class="grid-cell grid-cell-body">16</span>
                            <span class="grid-cell grid-cell-body">17</span>
                            <span class="grid-cell grid-cell-body">18</span>
                            <span class="grid-cell grid-cell-body">19</span>
                            <span class="grid-cell grid-cell-body">20</span>
                            <span class="grid-cell grid-cell-body">21</span>
                            <span class="grid-cell grid-cell-body">22</span>
                            <span class="grid-cell grid-cell-body">23</span>
                            <span class="grid-cell grid-cell-body">24</span>
                            <span class="grid-cell grid-cell-body">25</span>
                            <span class="grid-cell grid-cell-body">26</span>
                            <span class="grid-cell grid-cell-body">27</span>
                            <span class="grid-cell grid-cell-body">28</span>
                            <span class="grid-cell grid-cell-body">29</span>
                            <span class="grid-cell grid-cell-body">30</span>
                            <span class="grid-cell grid-cell-body">31</span>
                            <span class="grid-cell grid-cell-body">32</span>
                            <span class="grid-cell grid-cell-body">33</span>
                            <span class="grid-cell grid-cell-body">34</span>
                            <span class="grid-cell grid-cell-body grid-cell-body-disabled">35</span>
        
        
                        </div>
        
        
                    </div>
        `
        this.addEventListenerToMonthControls();
    }

    showCells() {
        this.cells = this.genDates(this.currentMonth);
        // console.log(this.cells)
        // console.log(this.monthNameContainer)
        let htmlString = ""
        this.datesGridContainer.innerHTML = "";
        for (const [i, cell] of this.cells.entries()) {
            if (cell.isCurrentMonth) {

                htmlString += `<span data-cell-id="${i}" class="grid-cell grid-cell-body">${cell.date.date()}</span>`
            } else {
                htmlString += `<span class="grid-cell grid-cell-body-disabled">${cell.date.date()}</span>`
            }


        }
        this.datesGridContainer.innerHTML = htmlString;
        this.monthNameContainer.innerHTML = this.currentMonth.format("MMM YYYY");

        // llamada al metodo que agrega el escuchador de eventos a las celdas
        this.addEventListenerToCells();
    };

    addEventListenerToMonthControls() {
        let controlElmements = this.containerId.querySelectorAll(".control")
        // console.dir(controlElmements)s
        for (let controlEl of controlElmements) {
            controlEl.addEventListener("click", (event) => {
                let controlTarget = event.target;
                if (controlTarget.classList.contains("control-next")) {
                    this.changeMonth()
                    this.showCells();
                } else {
                    this.changeMonth(false);
                    this.showCells();
                }
                // console.dir(controlTarget)
            })
        }
    };

    changeMonth(next = true) {
        if (next) {
            this.currentMonth.add(1, "months")
        } else {
            this.currentMonth.subtract(1, "months")
        }
    };

    addEventListenerToCells() {
        let cellsElements = this.datesGridContainer.querySelectorAll(".grid-cell")
        // console.log(cellsElements)
        // console.log(this.cells)
        // por si se te olvida aqui lo que tienes que hacer es recorrer ambos array y agregarle
        // y con un foreach de uno en el otro meterle el event listener y actualizar el this.cells para
        // meterle algun objeto adicional o algo asi referencia el index.js de la app de movie figth


        for (let cellElement of cellsElements) {
            cellElement.addEventListener("click", (event) => {
                let cellTarget = event.target;
                // cellTarget.data-bs-toggle = "modal"
                // data-bs-toggle
                // alert()
                // console.dir(cellTarget)
                this.selectedDate = this.cells[parseInt(cellTarget.dataset.cellId)].date;
                this.containerId.dispatchEvent(new Event("change"))

                // nota tiens que arreglar el bug de cuando se cliquea las desabiltadas 
            })
        }
    };

    getElement() {
        return this.containerId;
    }

    value() {
        return this.selectedDate;
    }

    getModalElement() {
        return this.modalcontainerId
    }
}
