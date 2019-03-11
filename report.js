const regForm = require(process.argv[2]);
const ascending = (a,b)=> a.displayOrder - b.displayOrder;
const obs = regForm.formElementGroups.sort(ascending).map(k => k.formElements.sort(ascending)).reduce((a, b) => a.concat(b), []).map(fm => {
    if (fm.type === 'MultiSelect') {
        return `multi_select_coded(e.observations->'${fm.concept.uuid}')::TEXT as "${fm.name}"`;
    } else if (fm.type === 'SingleSelect'){
        return `single_select_coded(e.observations->>'${fm.concept.uuid}')::TEXT as "${fm.name}"`;
    }
    else {
        return `(e.observations->>'${fm.concept.uuid}')::TEXT as "${fm.name}"`
    }
});
console.log('--generated using ihmp/report.js script');
console.log('pass the form path as an argument');
console.log('SELECT i.first_name,\n' +
    '       i.last_name,\n' +
    '       g.name,\n' +
    '       a.title,\n');
console.log(obs.join(',\n'));
console.log('from encounter e\n' +
    '       join individual i on i.id = e.individual_id'+
    '       LEFT OUTER JOIN gender g ON g.id = i.gender_id\n' +
    '       LEFT OUTER JOIN address_level a ON i.address_id = a.id;');
