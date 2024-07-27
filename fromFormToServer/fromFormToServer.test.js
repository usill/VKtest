const fromFormToServer = require('./fromFormToServer');

// tin - ИНН отечественных контрагентов
// foreign_tin - ИНН иностранных
// name - Имя физ лица
// company_title - Имя юр.лица
// type - один из вариантов (juridical, physical, foreign_juridical, foreign_physical)

describe('fromFormToServer', () => {
    test('Зарубежное юридическое лицо', () => {
        const personInForm = {
            isForeign: true,
            isJuridical: true,
            title: 'johnson\'s',
            tin: '7727563778'
        }
        const expectedData = {
            type: 'foreign_juridical',
            tin: null,
            name: null,
            foreign_tin: '7727563778',
            company_title: 'johnson\'s'
        }
    
        const result = fromFormToServer(personInForm);

        expect(result.tin).toBeNull();
        expect(result.name).toBeNull();
        expect(typeof result.foreign_tin).toBe('string');
        expect(typeof result.company_title).toBe('string');

        expect(result).toEqual(expectedData);
    })
    test('Отечественное юридическое лицо', () => {
        const personInForm = {
            isForeign: false,
            isJuridical: true,
            title: 'sber business soft',
            tin: '7730269550'
        }
        const expectedData = {
            type: 'juridical',
            tin: '7730269550',
            name: null,
            foreign_tin: null,
            company_title: 'sber business soft'
        }
    
        const result = fromFormToServer(personInForm);

        expect(typeof result.tin).toBe('string');
        expect(result.name).toBeNull();
        expect(result.foreign_tin).toBeNull();
        expect(typeof result.company_title).toBe('string');

        expect(result).toEqual(expectedData);
    })
    test('Зарубежное физическое лицо', () => {
        const personInForm = {
            isForeign: true,
            isJuridical: false,
            title: 'Mr. Bryan Walton',
            tin: '7730265566'
        }
        const expectedData = {
            type: 'foreign_physical',
            tin: null,
            name: 'Mr. Bryan Walton',
            foreign_tin: '7730265566',
            company_title: null,
        }
    
        const result = fromFormToServer(personInForm);

        expect(result.tin).toBeNull();
        expect(typeof result.name).toBe('string');
        expect(typeof result.foreign_tin).toBe('string');
        expect(result.company_title).toBeNull();

        expect(result).toEqual(expectedData);
    })
    test('Отечественное физическое лицо', () => {
        const personInForm = {
            isForeign: false,
            isJuridical: false,
            title: 'IP Derevyanchenko',
            tin: '7730265555'
        }
        const expectedData = {
            type: 'physical',
            tin: '7730265555',
            name: 'IP Derevyanchenko',
            foreign_tin: null,
            company_title: null,
        }
    
        const result = fromFormToServer(personInForm);

        expect(typeof result.tin).toBe('string');
        expect(typeof result.name).toBe('string');
        expect(result.foreign_tin).toBeNull();
        expect(result.company_title).toBeNull();

        expect(result).toEqual(expectedData);
    })
    test('Проверка мутации данных', () => {
        const personInForm = {
            isForeign: false,
            isJuridical: false,
            title: 'IP Derevyanchenko',
            tin: '7730265555'
        }

        const personInFormCopy = JSON.parse(JSON.stringify(personInForm));

        fromFormToServer(personInForm);

        expect(personInForm).toEqual(personInFormCopy);
    })
});