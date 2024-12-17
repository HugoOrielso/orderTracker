
interface TrackingResponse{
    Proveedor : string
    GuiaProveedor: string
    Estatus: State[]
    errores: string | null
}


interface State {
    fecha: string
    nombre: string
}