import { makeComponent, Component, System, EntityViewFactory, ECS, EntityOf, Entity } from 'perform-ecs'
import { name as fakeName } from 'faker'

@makeComponent
export class Bill extends Component {
    public lean: number
    public billName: string
    public preparedBy: EntityOf<Voter>

    public reset(obj: this, lean: number = 0, billName: string = "Generic Bill", preparedBy: EntityOf<Voter>) {
        obj.lean = lean
        obj.billName = billName
        obj.preparedBy = preparedBy
    }
}

@makeComponent
export class Voter extends Component {
    public lean: number;
    public tolerance: number;
    public name: string;
    public voteHistory: any
    public probBillWriting: number

    public reset(obj: this, lean: number = 0, tolerance: number = 1, name: string, probBillWriting: number = 0.05) {
        obj.lean = lean
        obj.tolerance = tolerance
        obj.name = name || fakeName.findName()
        obj.voteHistory = {}
        obj.probBillWriting = probBillWriting
    }
}

@makeComponent
class Accepted extends Component {
    public reset(obj: this) { }
}

class BillWritingSystem extends System {
    public voters = EntityViewFactory.createView({
        components: [Voter]
    })

    public update() {
        for (const voter of this.voters.entities.filter(f => f.probBillWriting > Math.random())) {
            let billLean = voter.lean + Math.random() * voter.tolerance - voter.tolerance / 2
            let billNum = billIdx++
            // console.log(`${voter.name} is preparing HR-${billNum} (${billLean})...`)
            this.ecs.createEntity([
                { component: Bill, args: [billLean, `HR-${billNum}`, voter] }]);
        }
    }
}

class VotingSystem extends System {
    public voters = EntityViewFactory.createView({
        components: [Voter]
    })
    public bills = EntityViewFactory.createView({
        components: [Bill]
    })
    public voteFor(entity: EntityOf<Voter>, bill: EntityOf<Bill>) {
        return entity.lean - bill.lean < entity.tolerance
    }
    public update() {
        for (const bill of this.bills.entities) {
            const votes = []
            for (const entity of this.voters.entities) {
                const votedFor = this.voteFor(entity, bill)
                entity.voteHistory[bill.billName] = votedFor
            }
        }

    }
}

const ecs = new ECS();
let votingSystem = new VotingSystem()
ecs.registerSystem(votingSystem)
ecs.registerSystem(new BillWritingSystem())

let billIdx = 1

// Create voters
for (let count = 0; count < 425; count++) {
    ecs.createEntity([
        { component: Voter, args: [Math.random() - 0.5, Math.random() / 2, null, Math.random() / 20], }]);
}

// you have to calculate delta on your own - there is no default implementation 
let delta = 0.01;

// system 'update' methods will be called
for (let count = 0; count < 250; count++) {
    ecs.update(delta)
}


for (const voter of votingSystem.voters.entities) {
    const forVotes = Object.values(voter.voteHistory).filter(val => val).length
    const voteRatio = forVotes/Object.values(voter.voteHistory).length
    console.log(`${voter.name} voted for ${Math.floor(voteRatio * 100)}% of bills.`)


}