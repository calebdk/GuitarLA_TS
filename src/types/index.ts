export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

//heredar el guitar

//export interface CartItem extends Guitar{
//    quantity: number
//}

export type CartItem = Guitar &{
    quantity: number
}

export type GuitarID  = Guitar['id']