export function formatValue(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}