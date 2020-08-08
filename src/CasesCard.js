import React from 'react';
import { FormattedMessage } from 'react-intl';
import Utils from './Utils';

export default function CasesCard (props) {
    let { cases, cardType } = props;
    cases = cases.filter(caseItem => !!caseItem.value);
    return (<table className="table total-details">
        <thead>
            <tr>
                <td colSpan="2" ><FormattedMessage id={cardType} /></td>
            </tr>
        </thead>
        <tbody>
            {
                cases.map((caseitem, index) => {
                    return (<tr key={index} className='caseitem-row'>
                        <td><FormattedMessage id={caseitem.type} /></td>
                        <td>{Utils.convertToIndianMetrics(caseitem.value)}</td>
                    </tr>)
                })
            }
        </tbody>
    </table>)
}