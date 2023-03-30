//Datos de entrada
const reservas = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

//Clase generica
class tarifa {
  constructor() {
    this._reserva = [];
    this._subtotal = 0;
    this._total = 0;
  }
  calculoTipoHabitacion(tipoHabitacion) {
    switch (tipoHabitacion) {
      case "standard":
        return 100;
      case "suite":
        return 150;
    }
  }
  calculoSubtotal() {
    const calculoBase = this._reserva.reduce(
      (acc, { tipoHabitacion, noches }) => {
        return acc + this.calculoTipoHabitacion(tipoHabitacion) * noches;
      },
      0
    );
    const ejercicioAdicional = this._reserva.reduce(
      (acc, { desayuno, noches, pax }) => {
        return acc + desayuno ? noches * pax * 15 : 0;
      },
      0
    );
    this._subtotal = calculoBase + ejercicioAdicional;
  }
  get subtotal() {
    return this._subtotal;
  }
  caclculoTotal() {
    this._total = this._subtotal * 1.21;
  }
  get total() {
    return this._total;
  }
  set reserva(reservaExterna) {
    this._reserva = reservaExterna;
    this.calculoSubtotal(this._reserva);
    this.caclculoTotal();
  }
}

//Subclase particular
class tarifaParticula extends tarifa {
  constructor() {
    super();
  }
  calculoSubtotal() {
    super.calculoSubtotal();
    //cargo adicional por ocupación
    const cargoAdicional = this._reserva.reduce((acc, { pax }) => {
      return acc + (pax - 1) * 40;
    }, 0);
    this._subtotal += cargoAdicional;
  }
}

//Subclase operador
class tarifaOperador extends tarifa {
  constructor() {
    super();
  }
  calculoTipoHabitacion(tipoHabitacion) {
    //equiparación en el precio de las habitaciones
    switch (tipoHabitacion) {
      case "standard":
        return 100;
      case "suite":
        return 100;
    }
  }
  calculoSubtotal() {
    super.calculoSubtotal();
    //descuento del 15%
    this._subtotal *= 0.85;
  }
}

const particular = new tarifaParticula();
particular.reserva = reservas;
console.log(
  "Tarifa Particular: ",
  "Subtotal",
  particular.subtotal.toFixed(2) + "€",
  "Total",
  particular.total.toFixed(2) + "€"
);

const operador = new tarifaOperador();
operador.reserva = reservas;
console.log(
  "Tarifa Tour Operador: ",
  "Subtotal",
  operador.subtotal.toFixed(2) + "€",
  "Total",
  operador.total.toFixed(2) + "€"
);
