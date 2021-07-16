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
    },
    classesTypesCLIP: (type) => {
        switch (type) {
            case 1: return "t"; break;
            case 2: return "p"; break;
            case 3: return "tp"; break;
            case 4: return "s"; break;
            case 5: return "ot"; break;
            case 6: return "tc"; break;
            case 7: return "to"; break;
            case 8: return "po"; break;
            case 9: return "op"; break;
        }
    },
    timeType: (time) => {
        switch (time) {
            case 1: return "a"; break;
            case 2: return "s"; break;
            case 3: return "s"; break;
            case 4: return "t"; break;
            case 5: return "t"; break;
            case 6: return "t"; break;
            case 7: return "t"; break;
        }
    },
    timeNumber: (time) => {
        switch (time) {
            case 1: return 1; break;
            case 2: return 1; break;
            case 3: return 2; break;
            case 4: return 1; break;
            case 5: return 2; break;
            case 6: return 3; break;
            case 7: return 4; break;
        }
    }
};

export default conf;