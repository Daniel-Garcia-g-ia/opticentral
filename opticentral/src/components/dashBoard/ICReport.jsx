import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference";





function ICReport() {
    const { dataReportProductionContext } = useContext(ReportContext);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timeDifference, setTimeDifference] = useState(null);
    const [dataSystem, setDataSystem] = useState('');
    const [dataSubSystem, setDataSubSystem] = useState('');
    const [dataComponent, setDataComponent] = useState('');
    const [dataModeFail, setDataModeFail] = useState('');
    const [dataSolution, setDataSolution] = useState('');
    const [dataMachines, setDataMachines] = useState('');
    const [optionSubSystem, setOptionSubSystem] = useState([])
    const [optionComponet, setOptionComponent] = useState([]);
    const [optionMachine, setOptionMachine] = useState([]);
    const [optionModeFailure, setOptionModeFailure] = useState([])
    const [data, setData] = useState(false);
    const [time, setTime] = useState(0);
    const [dataReport, setDataReport] = useState({
        startTime: null,
        endTime: null,
        totalTime: null,
        system: null,
        subSystem: null,
        component: null,
        failureMode: null,
        machine: null,
        solution: null,

    });

    const subsystemsBySystem = {
        'Averías de Equipamiento': [
            'Automatización',
            'Metrología',
            'Eléctrico',
            'Electrónico',
            'Hidráulico',
            'Lubricación',
            'Mecánico',
            'Neumático',
            'Transmisión',
        ],
        'Falta de Personal': [
            'Personal Insuficiente'
        ],
        'Paros de Calidad': [
            'Producto fuera de especificación',
            'Producto en Observación',
        ]

    }
    const componentsBySubsystem = {

        'Producto en Observación':[
            'Producto en Observación', 'Oxígeno', 'Espuma', 'Alcohol', 'Extracto'
        ],
        'Producto fuera de especificación': [
            'Producto fuera de especificación', 'Oxígeno', 'Espuma', 'Alcohol', 'Extracto'
        ],
        'Personal Insuficiente': [
            'Personal Insuficiente'
        ],
        'Automatización': [
            'BOTEC',
            'PLC',
            'Sensores',
            'Actuadores Eléctricos',
            'Pantallas',
            'Comunicación',
            'Reles',
            'Variadores',
            'Periferias'
        ],
        'Metrología': [
            'Medidor de Presión',
            'Medidor de Temperatura',
            'Medidor de Nivel',
            'Medidor de Peso',
            'Medidor de CO2',
            'Medidor de Oxígeno',
            'Medidor de Alcohol',
            'Medidor de Extracto',
            'Medidor de Turbidez',
            'Medidor de Densidad',
            'Medidor de AntonPar'
        ],
        'Eléctrico': [
            'Interruptor',
            'Guardamotor',
            'Cableado',
            'Transformador',
            'Motor',
            'Contactos',
            'Tablero',
            'Variadores',
            'Reles Térmicos',
            'PILZ',
            'Conectores'
        ],
        'Electrónico': [
            'Controlador',
            'Bus de Comunicación',
            'Sensores Electrónicos',
            'Fuentes de Alimentación'
        ],
        'Hidráulico': [
            'Bomba Hidráulica',
            'Cilindro Hidráulico',
            'Válvulas Direccionales',
            'Filtro Hidráulico',
            'Acumuladores',
            'Mangueras',
            'Tuberías',
            'Conexiones',
            'Acoples Rápidos',
            'Manómetros',
            'Aceite',
            'Empaques'
        ],
        'Lubricación': [
            'Bomba de Lubricación',
            'Filtros de Aceite',
            'Sistema de Lubricación Centralizado',
            'Aceites de lubricación',
            'Grasa de Lubricación',
            'Inyectores',
            'Depósito',
            'Sistema de Recirculación'
        ],
        'Mecánico': [
            'Rodamientos',
            'Engranajes',
            'Chumaceras',
            'Cadenas',
            'Poleas',
            'Tornillos y Tuercas',
            'Cojinetes',
            'Ejes',
            'Acoplamientos',
            'Juntas Tóricas',
            'Sellos Mecánicos',
            'Bombas',
            'Tubería',
            'Soldaduras',
            'Flanches',
            'Empaques',
            'Válvulas',
            'Actuador',
            'Prensa Estopa'
        ],
        'Neumático': [
            'Cilindro',
            'Actuador neumático',
            'Válvula',
            'Unidad de Mantenimiento',
            'Filtros',
            'Lubricadores de Aire',
            'Reguladores de Presión',
            'Mangueras',
            'Tuberías',
            'Acoples',
            'Racores',
            'Manómetros'
        ],
        'Transmisión': [
            'Cajas Reductoras',
            'Acoples Flexibles',
            'Acoples Rígidos',
            'Elastómeros',
            'Ejes de transmisión',
            'Correas',
            'Cadenas'
        ]
    };

    const failureModesByComponent = {
        'Personal Insuficiente': ['Falta de personal operativo'],
        'BOTEC': ['Falla de Comunicación', 'Error en servidores', 'Perdida de Visualización', 'Falla en Tendencias', 'Estacion no Disponible', 'Error al crear Receta', 'Receta en falla'],
        'PLC': ['Falla en memoria', 'Sin alimentación', 'Error de programación', 'Falla en perisféricos'],
        'Sensores': ['Error de lectura', 'Falla de conexión', 'Conector sulfatado', 'Cable Averiado'],
        'Actuadores Eléctricos': ['Desgaste del motor', 'Falla de cableado', 'Sobrecalentamiento', 'Falla de Funcionamiento'],
        'Pantallas': ['Falla en display', 'Alimentación eléctrica', 'Pantalla Bloqueada'],
        'Comunicación': ['Error de Cableado', 'Falla de Switch', 'Error de Parametros', 'Error de controladores'],
        'Reles': ['Falla eléctrica', 'Falla de Bobina', 'Falla de Contactos', 'Falla del componente'],
        'Variadores': ['Falla Alimentacion', 'Falla de Parametros', 'Sobretensión', 'falla Eléctrica', 'Parada segura', 'Estado en Manual'],
        'Perisferias': ['Falla Alimentacion', 'Falla de Parametros', 'Sobretensión', 'falla Eléctrica', 'Falla de Cableado'],
        'Presión': ['Falla de medicion', 'Error de medición', 'Calibración', 'Alimentación', 'Conector Averiado', 'Daño de Componente'],
        'Medidor de Temperatura': ['Falla de medicion', 'Error de Conexión', 'Calibración', 'Alimentación', 'Conector Averiado', 'Daño de Componente'],
        'Medidor de Nivel': ['Falla de medicion', 'Error de Conexión', 'Calibración', 'Alimentación', 'Conector Averiado', 'Daño de Componente'],
        'Medidor de Peso': ['Falla de medicion', 'Error de Conexión', 'Calibración', 'Alimentación', 'Conector Averiado', 'Daño de Componente'],
        'Medidor de CO2': ['Falla de medicion', 'Error de Conexión', 'Calibración', 'Alimentación', 'Conector Averiado', 'Daño de Componente'],
        'Medidor de Oxígeno': ['Falla de medicion', 'Error de Conexión', 'Calibración', 'Alimentación', 'Conector Averiado', 'Daño de Componente'],
        'Medidor de Alcohol': ['Falla de medicion', 'Error de Conexión', 'Calibración', 'Alimentación', 'Conector Averiado', 'Daño de Componente'],
        'Medidor de Extracto': ['Falla de medicion', 'Error de Conexión', 'Calibración', 'Alimentación', 'Conector Averiado', 'Daño de Componente'],
        'Medidor de Turbidez': ['Falla de medicion', 'Error de Conexión', 'Calibración', 'Alimentación', 'Conector Averiado', 'Daño de Componente'],
        'Medidor de Densidad': ['Falla de medicion', 'Error de Conexión', 'Calibración', 'Alimentación', 'Conector Averiado', 'Daño de Componente'],
        'Medidor de AntonPar': ['Falla de programa', 'Falla de medicion', 'Error de Conexión', 'Calibración', 'Alimentación', 'Conector Averiado', 'Daño de Componente'],
        'Interruptor': ['Corto Circuito', 'SobreTension', 'SobreCorriente', 'Fallo de componente', 'Falla de cableado', 'Falla de Contacto', 'Alimentacion'],
        'Guardamotor': ['Corto Circuito', 'SobreTension', 'SobreCorriente', 'Fallo de componente', 'Falla de cableado', 'Falla de Contacto', 'Alimentacion'],
        'Cableado': ['Corto Circuito', 'SobreTension', 'SobreCorriente', 'Fallo de componente', 'Daño de aislamiento', 'Falla de Conexión'],
        'Transformador': ['Corto Circuito', 'SobreTension', 'SobreCorriente', 'Fallo de componente', 'Falla de cableado', 'Falla de Tierra'],
        'Motor': ['Corto Circuito', 'SobreTension', 'SobreCorriente', 'Fallo de componente', 'Falla de cableado', 'Falla de Tierra', 'Sobre-esfuerzo', 'Carga alta', 'Rodamientos', 'Embobinado', 'Borna', 'Disipador', 'Acople'],
        'Contactos': ['Corto Circuito', 'SobreTension', 'SobreCorriente', 'Fallo de componente'],
        'Tablero': ['Aislamiento', 'Corto Circuito', 'Conectores', 'Barraje', 'Medidores'],
        'Reles Térmicos': ['Corto Circuito', 'SobreTension', 'SobreCorriente', 'Fallo de componente', 'Falla de cableado', 'Falla de Contacto', 'Alimentacion'],
        'PILZ': ['Fallo de Componente', 'Falla de parametros', 'Falla de funcionamiento', 'Falla de conectores', 'Falla de periferia', 'Falla de Circuito'],
        'Conectores': ['Corto Circuito', 'SobreTension', 'SobreCorriente', 'Fallo de componente', 'Falla de cableado', 'Falla de Contacto', 'Alimentacion'],
        'Controlador': ['Falla de Alimentación', 'Falla de Componente', 'Falsos Contactos', 'Corto Circuito'],
        'Bus de Comunicación': ['Falla de Alimentación', 'Falla de Componente', 'Falsos Contactos', 'Corto Circuito'],
        'Sensores Electrónicos': ['Falla de Alimentación', 'Falla de Componente', 'Falsos Contactos', 'Corto Circuito'],
        'Fuentes de Alimentación': ['Falla de Alimentación', 'Falla de Componente', 'Falsos Contactos', 'Corto Circuito'],
        'Bomba Hidráulica': ['Falla de Conexion', 'Falla de sellos', 'Falla de Orings', 'Acoples', 'Tubería', 'Conexiones Eléctricas', 'Falla de Bobinas', 'Cabitación'],
        'Cilindro Hidráulico': ['Empaques', 'Bastago', 'Recamara', 'Fuga', 'Acoples', 'Tuberías', 'Mangueras'],
        'Válvulas Direccionales': ['Empaques', 'Acoples', 'Tuberías', 'Mangueras', 'Bobinas', 'Filtro', 'Fallo de componente'],
        'Filtro Hidráulico': ['Suciedad', 'Falla del componente', 'Cambio', 'integridad', 'Saturación'],
        'Acumuladores': ['Suciedad', 'Falla del componente', 'Cambio', 'integridad', 'Saturación'],
        'Mangueras': ['Sobre presion', 'Condiciones de ambiente', 'Radio de Curva', 'cizallamiento', 'Saturación'],
        'Tuberías': ['Sobre presion', 'Condiciones de ambiente', 'Saturación', 'Acoples'],
        'Conexiones': ['Sobre presion', 'Condiciones de ambiente', 'Saturación', 'Acoples'],
        'Acoples Rápidos': ['Sobre presion', 'Condiciones de ambiente', 'Saturación', 'Acoples'],
        'Manómetros': ['Sobre presion', 'Condiciones de ambiente', 'Saturación', 'Acoples', 'integridad', 'Gestión Visual'],
        'Aceite': ['Contaminacion', 'Derrame', 'Nivel', 'Vida Util'],
        'Empaques': ['Sobre presion', 'Condiciones de ambiente', 'Lubricación', 'Vida Util'],
        'Bomba de Lubricación': ['Falla de Conexion', 'Falla de sellos', 'Falla de Orings', 'Acoples', 'Tubería', 'Conexiones Eléctricas', 'Falla de Bobinas', 'Cabitación'],
        'Filtros de Aceite': ['Suciedad', 'Falla del componente', 'Cambio', 'integridad', 'Saturación'],
        'Sistema de Lubricación Centralizado': ['Alimentacion', 'Error del componente', 'Falla de Parametros', 'Corto Circuito'],
        'Aceites de lubricación': ['Contaminacion', 'Derrame', 'Nivel', 'Vida Util'],
        'Grasa de Lubricación': ['Contaminacion', 'Derrame', 'Nivel', 'Vida Util'],
        'Inyectores': ['Suciedad', 'Falla del componente', 'Cambio', 'integridad', 'Saturación'],
        'Depósito': ['Nivel', 'Suciedad', 'Falla del componente', 'Cambio', 'integridad', 'Saturación'],
        'Sistema de Recirculación': ['Suciedad', 'Falla del componente', 'Cambio', 'integridad', 'Saturación'],
        'Rodamientos': ['Falta de Lubricación', 'Exceso de Lubricación', 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Engranajes': ['Falta de Lubricación', 'Exceso de Lubricación', 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Chumaceras': ['Falta de Lubricación', 'Exceso de Lubricación', 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Cadenas': ['Falta de Lubricación', 'Exceso de Lubricación', 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Poleas': ['Falta de Lubricación', 'Exceso de Lubricación', , 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Tornillos y Tuercas': ['Torque', 'Desgaste', 'Instalacion', 'Rosca', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión'],
        'Cojinetes': ['Falta de Lubricación', 'Exceso de Lubricación', , 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Ejes': ['Falta de Lubricación', 'Exceso de Lubricación', , 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Acoplamientos': ['Falta de Lubricación', 'Exceso de Lubricación', , 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Juntas Tóricas': ['Falta de Lubricación', 'Exceso de Lubricación', , 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Sellos Mecánicos': ['O-Rings', 'Alineacion', 'Falta de Lubricación', 'Exceso de Lubricación', 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Bombas': ['O-Rings', 'Alineacion', 'Falta de Lubricación', 'Rodamientos', 'Impulsor', 'Sello', 'Exceso de Lubricación', 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Tubería': ['Corrosión', 'Vibraciones', 'Químicos', 'Aislaminetos', 'Poros', 'Acoplamiento'],
        'Soldaduras': ['Purga', 'Vibraciones', '¨Corrosión', 'Químicos', 'Poros', 'Olguras', 'Fracturas'],
        'Flanches': ['Corrosión', 'Vibraciones', 'Químicos', 'Aislaminetos', 'Poros', 'Acoplamiento', 'Empaques'],
        'Empaques': ['Falta de Lubricación', 'Exceso de Lubricación', , 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación'],
        'Válvulas': ['O-Rings', 'Empaques', 'Tornillos', 'Conexiones', 'Corrosión', 'Vibraciones', 'Químicos', 'Racores', 'Conexiones', 'Alimentación', 'Acoples'],
        'Actuador': ['O-Rings', 'Empaques', 'Tornillos', 'Conexiones', 'Corrosión', 'Vibraciones', 'Químicos'],
        'Prensa Estopa': ['Cordón Grafitado', 'Ajuste', 'Lubricación', 'Buje'],
        'Cilindro': ['O-Rings', 'Empaques', 'Tornillos', 'Conexiones', 'Corrosión', 'Vibraciones', 'Químicos', 'Acoples', 'Manguera', 'Racord', 'Bastago'],
        'Actuador neumático': ['O-Rings', 'Empaques', 'Tornillos', 'Conexiones', 'Corrosión', 'Vibraciones', 'Químicos', 'Acoples', 'Manguera', 'Racord', 'Bastago'],
        'Unidad de Mantenimiento': ['Mangueras', 'Acoples', 'Racores', 'Filtros', 'Drenajes', 'Lubricación', 'Integridad', 'Condiciones de Ambiente'],
        'Filtros': ['Suciedad', 'Falla del componente', 'Cambio', 'integridad', 'Saturación'],
        'Lubricadores de Aire': ['Suciedad', 'Falla del componente', 'Cambio', 'integridad', 'Saturación'],
        'Reguladores de Presión': ['Suciedad', 'Falla del componente', 'Cambio', 'integridad', 'Saturación'],
        'Acoples': ['Sobre presion', 'Condiciones de ambiente', 'Saturación', 'Fractura'],
        'Racores': ['Sobre presion', 'Condiciones de ambiente', 'Saturación', 'Fractura'],
        'Manómetros': ['Sobre presion', 'Condiciones de ambiente', 'Saturación', 'Fractura'],
        'Cajas Reductoras': ['Nivel de Aceite', 'Alineacion', 'Acoples flexible', 'Acople Rigido', 'Tapones', 'Alineación', 'Eje', 'Retenedores', 'Rodamientos', 'Empaques'],
        'Acoples Flexibles': ['Elastómeros', 'Ajuste', 'Alineación', 'Sobre Carga', 'Olguras', 'Desgaste', 'Tornillería'],
        'Acoples Rígidos': ['Elastómeros', 'Ajuste', 'Alineación', 'Sobre Carga', 'Olguras', 'Desgaste', 'Tornillería'],
        'Elastómeros': ['Desgaste', 'Ajuste', 'Alineación'],
        'Ejes de transmisión': ['Nivel de Aceite', 'Alineacion', 'Acoples flexible', 'Acople Rigido', 'Tapones', 'Alineación', 'Eje', 'Retenedores', 'Rodamientos', 'Empaques'],
        'Correas': ['Falta de Lubricación', 'Exceso de Lubricación', 'Desgaste', 'Alta Temperatura', 'Baja de Temperatura', 'Vibraciones', 'Condiciones del Ambiente', 'Olguras', 'Alogamientos', 'Fractura', 'Corrosión', 'Falla de alineación']

    }

    const machines = [
        'Filtro Prensa',
        'PreMacerador',
        'Macerador 1',
        'Macerador 2',
        'Cocedor de Adjuntos',
        'Tanque de Espera',
        'Cocedor de Mosto',
        'Whirlpool',
        'Enfriador',

    ]

    useEffect(() => {
        dataReportProductionContext(dataReport)
    }, [dataReport])


    /*    useEffect(() => {
   
           if (dataSystem === 'Averías de Equipamiento') {
               setOptionSubSystem([
                   'Automatización',
                   'Metrología',
                   'Eléctrico',
                   'Electrónico',
                   'Hidráulico',
                   'Lubricación',
                   'Mecánico',
                   'Neumático',
                   'Transmisión',
   
               ])
           } else {
               setOptionSubSystem([])
           }
   
   
           if (dataSubSystem === 'Automatización') {
               setOptionComponent([
                   'BOTEC',
                   'PLC',
                   'Sensores',
                   'Actuadores Eléctricos',
                   'Pantallas',
                   'Comunicación',
                   'Reles',
                   'Variadores',
                   'Periferias'
   
               ])
           } else if (dataSubSystem === 'Metrología') {
               setOptionComponent([
                   'Presión',
                   'Temperatura',
                   'Nivel',
                   'Peso',
                   'CO2',
                   'Oxigeno',
                   'Alcohol',
                   'Extracto',
                   'Turbidez',
                   'Densidad',
                   'AntonPar'
   
               ])
           } else if (dataSubSystem === 'Eléctrico') {
   
               setOptionComponent([
                   'Interruptor',
                   'Guardamotor',
                   'Cableado',
                   'Transformador',
                   'Motor',
                   'Contactos',
                   'Tablero',
                   'Variadores',
                   'Reles Termicos',
                   'PILZ',
                   'Conectores',
   
               ])
           } else if (dataSubSystem === 'Electrónico') {
   
               setOptionComponent([
                   'Controlador',
                   'Bus de Comunicación',
                   'Sensores Electrónicos',
                   'Fuentes de Alimentación'
               ])
           }
           else if (dataSubSystem === 'Hidráulico') {
   
               setOptionComponent([
                   'Bomba Hidráulica',
                   'Cilindro Hidráulico',
                   'Válvulas Direccionales',
                   'Filtro Hidráulica',
                   'Acumuladores',
                   'Mangueras',
                   'Tuberias',
                   'Conexiones',
                   'Acoples Rapidos',
                   'Manómetros',
                   'Aceite',
                   'Empaques'
               ])
           } else if (dataSubSystem === 'Lubricación') {
   
               setOptionComponent([
                   'Bomba de Lubricación',
                   'Filtros de Aceite',
                   'Sistema de Lubricación Centralizado',
                   'Aceites de lubricación',
                   'Grasa de Lubricación',
                   'Inyectores',
                   'Depósito',
                   'Sistema de Recirculación'
   
               ])
           } else if (dataSubSystem === 'Mecánico') {
   
               setOptionComponent([
                   'Rodamientos',
                   'Engranajes',
                   'Chumaceras',
                   'Cadenas',
                   'Poleas',
                   'Tornillos y Tuercas',
                   'Cojinetes',
                   'Ejes',
                   'Acoplamientos',
                   'Juntas Toricas',
                   'Sellos Mecánicos',
                   'Bombas',
                   'Tuberia',
                   'Soldaduras',
                   'flanches',
                   'Empaques',
                   'Válvulas',
                   'Actuador',
                   'Prensa Estopa'
   
   
               ])
           } else if (dataSubSystem === 'Neumático') {
   
               setOptionComponent([
                   'Cilindro',
                   'Actuador neumático',
                   'Válvula',
                   'Unidad de Mantenimiento',
                   'filtros',
                   'Lubricadores de Aire',
                   'Reguladores de Presión',
                   'Mangueras',
                   'Tuberías',
                   'Acoples',
                   'Racores',
                   'Manómetros',
               ])
           } else if (dataSubSystem === 'Transmisión') {
   
               setOptionComponent([
                   'Cajas Reductoras',
                   'Acoples Flexibles',
                   'Acoples Rígidos',
                   'Elastomeros',
                   'Ejes de transmisión',
                   'Correas',
                   'Cadenas',
   
   
               ])
           }
           else {
               setOptionComponent([])
           }
   
       
   
   
   
   
   
       }, [dataSystem, dataSubSystem, dataComponent])
    */
    useEffect(() => {
        // The Effect of information management

        dataReportProductionContext(dataReport)

    }, [dataReport])

    useEffect(() => {
        setTime(timeDifference)


    }, [timeDifference])

    useEffect(() => {
        setDataReport(prevState => ({
            ...prevState,
            totalTime: time
        }))

    }, [time])

    // The const of the input

    const handledChangeInputStart = (e) => {
        const value = e.target.value;
        setStartTime(value);
        const totalTimeDifference = calculateTimeDifference(value, endTime);
        setTimeDifference(totalTimeDifference)
        setDataReport(prevState => ({
            ...prevState,
            startTime: value
        }))
        setData(!data);

    }

    const handledChangeInputEnd = (e) => {
        const value = e.target.value;
        setEndTime(value);
        const totalTimeDifference = calculateTimeDifference(startTime, value);
        setTimeDifference(totalTimeDifference);
        setDataReport(prevState => ({
            ...prevState,
            endTime: value
        }))
        setData(!data);

    }

    const handledChangeInputSystem = (e) => {
        const value = e.target.value;
        setDataSystem(value);
        setDataReport(prevState => ({
            ...prevState,
            system: value
        }))
        setData(!data);
        setOptionComponent([])
        setOptionModeFailure([])
        setOptionSubSystem([])
        setDataComponent([])
        setDataMachines([])
        setDataModeFail([])

        if (subsystemsBySystem[value]) {
            setOptionSubSystem(subsystemsBySystem[value])
        } else {
            setOptionSubSystem([])
        }


    }
    const handledChangeInputSubSystem = (e) => {
        const value = e.target.value;
        setDataSubSystem(value);
        setDataReport(prevState => ({
            ...prevState,
            subSystem: value
        }))
        setData(!data);

        if (componentsBySubsystem[value]) {
            setOptionComponent(componentsBySubsystem[value])
        } else {
            setOptionComponent([])
        }




    }
    const handledChangeInputComponent = (e) => {
        const value = e.target.value;
        setDataComponent(value);
        setDataReport(prevState => ({
            ...prevState,
            component: value
        }))
        setData(!data);

        if (failureModesByComponent[value]) {
            setOptionModeFailure(failureModesByComponent[value])
            setOptionMachine(machines)
        } else {
            setOptionModeFailure([])
        }




    }
    const handledChangeInputModeFail = (e) => {
        const value = e.target.value;
        setDataModeFail(value);
        setDataReport(prevState => ({
            ...prevState,
            failureMode: value
        }))
        setData(!data);

    }
    const handledChangeMachines = (e) => {
        const value = e.target.value;
        setDataMachines(value);
        setDataReport(prevState => ({
            ...prevState,
            dataMachines: value
        }))
        setData(!data);

    }
    const handledChangeInputSolution = (e) => {
        const value = e.target.value;
        setDataSolution(value);
        setDataReport(prevState => ({
            ...prevState,
            solution: value
        }))
        setData(!data);

    }




    return (
        <>
            <section className="columns is-centered">

                <label className="custom-label-total-report-averia">Tiempo Total de Avería: {timeDifference} h</label>


                <div className="columns is-centered has-text-centered">
                    <div className="column">
                        <div className="field is-horizontal pt-1">

                            <div className="field">
                                <label className="label custom-label">Inicio</label>
                                <div className="control">
                                    <input className="input is-small" type="time" value={startTime} onChange={handledChangeInputStart} />
                                </div>
                            </div>

                            <div className="field pl-3">
                                <label className="label custom-label">Fin</label>
                                <div className="control">
                                    <input className="input is-small" type="time" value={endTime} onChange={handledChangeInputEnd} />
                                </div>
                            </div>

                        </div>

                    </div>


                </div>



            </section>

            <section className="columns is-centered">
                <div className="columns is-centered pt-1">
                    <div className="column">
                        <div className=" field is-horizontal">
                            <div className="field">
                                <label className="label custom-label">Tipo de Parada</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="sistema" id="sistem" value={dataSystem} onChange={handledChangeInputSystem}>
                                        <option> </option>
                                        <option>Averías de Equipamiento</option>
                                        <option>Falta de Personal</option>
                                        <option>Paros de Calidad</option>
                                        
                                    </select>
                                </div>

                            </div>

                            <div className="field pl-2">
                                <label className="label custom-label">Sistema</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="subSytem" id="subSystem" value={dataSubSystem} onChange={handledChangeInputSubSystem}>
                                        <option value='' > </option>
                                        {optionSubSystem.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                            <div className="field pl-2">
                                <label className="label custom-label">Componente</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="sistema" id="sistem" value={dataComponent} onChange={handledChangeInputComponent}>
                                        <option value=' '> </option>
                                        {optionComponet.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))

                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="field pl-2">
                                <label className="label custom-label">Modo de falla</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="sistema" id="sistem" value={dataModeFail} onChange={handledChangeInputModeFail}>
                                        <option value=' '> </option>
                                        {optionModeFailure.map((option, index) => (
                                            <option key={index} value={option} >
                                                {option}
                                            </option>
                                        ))}

                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </section>
            <section className="columns is-centered">
                <div className="columns is-centered">
                    <div className="column">
                        <div className="field pl-2">
                            <label className="label custom-label">Máquina</label>
                            <div className="select is-small">
                                <select className="is-hovered custom-width-add-report-averia " name="sistema" id="sistem" value={dataMachines} onChange={handledChangeMachines}>
                                    <option value=' '> </option>
                                    {optionMachine.map((option, index) => (
                                        <option key={index} value={option} >
                                            {option}
                                        </option>
                                    ))}

                                </select>
                            </div>

                        </div>



                    </div>


                </div>


            </section>

            <section className="columns is-centered">
                <div className="columns is-centered pt-2">
                    <div className="column">
                        <div className="fieid">
                            <label className="label custom-label">Solución</label>
                            <div className="text-area-width">
                                <textarea
                                    className="textarea is-info is-small"
                                    placeholder="ingrese texto"
                                    value={dataSolution}
                                    onChange={handledChangeInputSolution}
                                ></textarea>
                            </div>

                        </div>



                    </div>


                </div>


            </section>
        </>
    )
}

export default ICReport