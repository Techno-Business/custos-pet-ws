export interface IPetCostRepository {
    save(costId: string, petId: string[]): Promise<void>
}