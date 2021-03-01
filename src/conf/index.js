const conf = {
    name: "Simulador de Horários",
    logo: "./logo.png",
    classesTypes: (type) => {
        switch (type) {
            case 1: return "t"; break;
            case 2: return "p"; break;
            case 3: return "tp"; break;
            case 4: return "s"; break;
            case 5: return "ot"; break;
            case 6: return "tc"; break;
            case 7: return "to"; break;
            case 8: return "po"; break;
            case 9: return "tpo"; break;
        }
    }
};

export default conf;