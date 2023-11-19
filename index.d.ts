export type PixType = "email" | "cpf" | "cnpj" | "random" | "phone" | "qrcode"

export interface InvalidPix extends Error {
    message: "chave pix invalida."
}

export type Pix = {
    type: PixType,
    pix: string,
}

export interface IdentifyDto {
    pix: string
}

export interface NormalizeDto {
    pix: string 
}

export interface ValidateDto {
    type?: PixType,
    pix: string
}

export function identify(input: IdentifyDto): Pix | InvalidPix
export function normalize(input: NormalizeDto): Pix | InvalidPix
export function validate(input: ValidateDto): Boolean | InvalidPix