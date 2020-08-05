import React from 'react';
import CasesCard from './CasesCard';
import Loader from './Loader';
export default function CasesCardWrapper (props) {
    let { allData, indiaCases, andhraCases, telanganaCases } = props;
    if (!(allData && indiaCases && andhraCases && telanganaCases)) {
        return <Loader />;
    }

    let totalCases = [
        { "type": 'world', value: allData.cases },
        { "type": 'India', value: indiaCases.cases },
        { "type": 'Andhra Pradesh', value: andhraCases.cases },
        { "type": 'Telangana', value: telanganaCases.cases }
    ];
    let criticalCases = [
        { "type": 'world', value: allData.critical, },
        { "type": 'India', value: indiaCases.critical },
        { "type": 'Andhra Pradesh', value: andhraCases.critical },
        { "type": 'Telangana', value: telanganaCases.critical }
    ];
    let recoveredCases = [
        { "type": 'world', value: allData.recovered },
        { "type": 'India', value: indiaCases.recovered },
        { "type": 'Andhra Pradesh', value: andhraCases.recovered },
        { "type": 'Telangana', value: telanganaCases.recovered }
    ];
    let deathChases = [
        { "type": 'world', value: allData.deaths },
        { "type": 'India', value: indiaCases.deaths },
        { "type": 'Andhra Pradesh', value: andhraCases.deaths },
        { "type": 'Telangana', value: telanganaCases.deaths }
    ];

    let tests = [
        { "type": 'world', value: allData.tests },
        { "type": 'India', value: indiaCases.tests },
        { "type": 'Andhra Pradesh', value: andhraCases.tests },
        { "type": 'Telangana', value: telanganaCases.tests }
    ];
    return (
        <div className='row'>
            < div className='col-sm-12 col-md-4 all-cases-card' >
                <CasesCard cases={totalCases} cardType="cases" />
            </div >
           
            <div className='col-sm-12 col-md-4 recovered-cases-card'>
                <CasesCard cases={recoveredCases}
                    cardType="recovered" />
            </div>
            <div className='col-sm-12 col-md-4 deaths-card'>
                <CasesCard cases={deathChases}
                    cardType="deaths" />
            </div>
            <div className='col-sm-12 col-md-4 tests-card'>
                <CasesCard cases={tests}
                    cardType="tests" />
            </div>
            <div className='col-sm-12 col-md-4 critical-card'>
                <CasesCard cases={criticalCases} cardType="critical" />
            </div>
        </div >
    )
}