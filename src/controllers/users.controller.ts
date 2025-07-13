export default class UserController{
    public get( req: any, res: any ): void {
         res.json({message: "hello, World!"});
    }
}