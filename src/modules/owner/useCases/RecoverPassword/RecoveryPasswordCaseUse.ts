import { IOwnerRepository } from "../../owner.repository";


export class RecoveryPasswordCaseUse{
    constructor( private ownerRepository: IOwnerRepository,){}

    private generateCode(){
        return Math.round(Math.random()*100000).toString();
    }


    async execute(email: string){
        let code = '';
        
        let hasOwnerCollision = false;
        do{
        
            code = this.generateCode();
            this.ownerRepository.existsByPasswordValidationKey(code).then((value)=>{
                hasOwnerCollision = value
            });
        }while(hasOwnerCollision);


        let owner = await this.ownerRepository.findByEmail(email);
        if (owner! != null){    
            this.ownerRepository.update(owner!, {passwordValidationKey: code} )
        }
        else
            code = 'owner not found'

        return code;
    }
    

}