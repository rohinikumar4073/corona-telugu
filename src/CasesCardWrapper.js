import React from 'react';
import CasesCard from './CasesCard';
import Loader from './Loader';
export default function CasesCardWrapper (props) {
    let { allData, indiaCases } = props;
    return (
        <>
            {
                allData && indiaCases ?
                    <div className='row'>
                        < div className='col-sm-12 col-md-4 all-cases-card' >
                            <CasesCard cases={[{ "type": 'world', value: allData.cases }, { "type": 'India', value: indiaCases.cases }]} cardType="cases" />
                        </div >
                        <div className='col-sm-12 col-md-4 critical-card'>
                            <CasesCard cases={[{ "type": 'world', value: allData.critical }, { "type": 'India', value: indiaCases.critical }]} cardType="critical" />
                        </div>
                        <div className='col-sm-12 col-md-4 recovered-cases-card'>
                            <CasesCard cases={[{ "type": 'world', value: allData.recovered }, { "type": 'India', value: indiaCases.recovered }]} cardType="recovered" />
                        </div>
                        <div className='col-sm-12 col-md-4 deaths-card'>
                            <CasesCard cases={[{ "type": 'world', value: allData.deaths }, { "type": 'India', value: indiaCases.deaths }]} cardType="deaths" />
                        </div>
                        <div className='col-sm-12 col-md-4 tests-card'>
                            <CasesCard cases={[{ "type": 'world', value: allData.tests }, { "type": 'India', value: indiaCases.tests }]} cardType="tests" />
                        </div>
                    </div > : <Loader />
            }
        </>
    )
}