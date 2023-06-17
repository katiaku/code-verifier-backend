export interface IHelloController {
    getMessage(name?: string): Promise<any>
}
