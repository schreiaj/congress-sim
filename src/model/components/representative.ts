import { makeComponent, Component, ECS } from 'perform-ecs'

@makeComponent
export class Representative extends Component {
    public lean: number = 0;
    public tolerance: number = 0;
    public name: string = "MyRepresentative";
    public voteHistory: {} = {}
    public probBillWriting: number = 0

    public reset(obj: this, args: { lean: number, tolerance: number, name: string, probBillWriting: number }) {
        obj.lean = args.lean
        obj.tolerance = args.tolerance
        obj.name = args.name
        obj.voteHistory = {}
        obj.probBillWriting = args.probBillWriting
    }
}

export const factory = (ecs: ECS) => (lean: number, tolerance: number, name: string, probBillWriting: number) => {
    ecs.createEntity([
        { component: Representative, args: [{ lean, tolerance, name, probBillWriting }] }
    ])
}