import React from "react";
import { useState, useEffect } from "react";
import { LiaEditSolid } from "react-icons/lia";
import EditReport from "../modal/EditReport";
import CardDetailProduction from "./CardDetailProduction";
import CardDetailExtern from "./CardDetailExtern";
import { TbRuler } from "react-icons/tb";
import { SiNamemc } from "react-icons/si";

function ReportDetail({ data, setActiveDetail }) {

    const [activateEditModal, setActivateEditModal] = useState(false);
    const [activeExternal, setActiveExternal] = useState(false);
    const [activeProduction, setActiveProduction] = useState(false);
    const [dataReportExtern, setDataReportExtern] = useState({});



    useEffect(() => {

        if (data.type !== 'EBT') {
            setActiveExternal(true)
            setDataReportExtern(data)      

        }        
        else if (data.type === 'EBT') {
            setActiveProduction(true);
        }

    }, [])


    const handledHover = () => {
        setActiveDetail(true)
    }

    const handledOut = () => {
        setActiveDetail(false)
    }

    const handleClickEdit = () => {
        setActivateEditModal(true)

    }



    return (
        <>
            {activeProduction &&
                <CardDetailProduction data={data} handledHover={handledHover}
                    handledOut={handledOut} setActiveDetail={setActiveDetail}
                    activateEditModal={activateEditModal} handleClickEdit={handleClickEdit}
                />}

            {activeExternal &&
                <CardDetailExtern data={data} handledHover={handledHover}
                    handledOut={handledOut} setActiveDetail={setActiveDetail}
                    activateEditModal={activateEditModal} handleClickEdit={handleClickEdit}

                />}


            {activateEditModal && <EditReport data={data} setActiveDetail={setActiveDetail} />}


        </>
    )


}


export default ReportDetail;