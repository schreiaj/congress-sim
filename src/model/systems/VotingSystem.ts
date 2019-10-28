import { System, EntityViewFactory } from "perform-ecs"

import {Representative} from '../components/representative'

export class VotingSystem extends System {
    public voters = EntityViewFactory.createView({
        components: [Representative]
    });
    public bills = EntityViewFactory.createView({
        components: []
    });
    // public voteFor(entity: EntityOf<Voter>, bill: EntityOf<Bill>) {
    //     return entity.lean - bill.lean < entity.tolerance
    // }
    public update() {
        for (const bill of this.bills.entities) {
            const votes = [];
            for (const entity of this.voters.entities) {
                // const votedFor = this.voteFor(entity, bill)
                // entity.voteHistory[bill.billName] = votedFor
            }
        }
    }
}
