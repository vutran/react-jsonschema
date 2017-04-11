import types from './constants/types';

/**
 * Retrieve the input element type based on the schema type
 *
 * @param {Object} schema
 * @return {String}
 */
export function getInputType(schema) {
    let inputType = 'text';
    switch (schema.type) {
        default:
            inputType = 'text';
            break;
        case types.BOOLEAN:
            inputType = 'checkbox';
            break;
        case types.INTEGER:
            inputType = 'number';
            break;
        case types.NUMBER:
            inputType = 'number';
            break;
        case types.STRING:
            inputType = 'text';
            break;
    }
    return inputType;
}

/**
 * Given a schema, returns the default state based on its type.
 * If the formData is specified, it will be matched against the schema
 * and returned
 *
 * @param {Object} schema
 * @param {Object} formData
 * @return {Object}
 */
export function getDefaultState(schema, formData) {
    switch (schema.type) {
        case types.OBJECT: {
            const c = {};
            const props = Object.keys(schema.properties);
            props.forEach(prop => {
                const f = formData ? formData[prop] : null;
                c[prop] = getDefaultState(schema.properties[prop], f);
            });
            return c;
        }
        case types.ARRAY:
            return formData || schema.default || [getDefaultState(schema.items)];
        case types.STRING:
            return formData || schema.default || '';
        case types.BOOLEAN:
            return formData || schema.default || false;
        case types.NUMBER:
            return formData || schema.default || 0;
        case types.INTEGER:
            return formData || schema.default || 0;
        case types.NULL:
            return formData || schema.default || null;
        default:
            return formData || schema.default || null;
    }
}
