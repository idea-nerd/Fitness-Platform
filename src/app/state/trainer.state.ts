import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ReadTrainersClientCount } from '../actions/trainer.actions';
import { TrainersService } from '../services/trainers/trainers.service';
import {tap} from 'rxjs/operators';

export class TrainerStateModel {
    trainerClients: any[];
}

@State<TrainerStateModel>({
    name: 'trainers',
    defaults: {
        trainerClients: [],
    },
})

export class TrainerState {

    constructor(private trainerService: TrainersService) { }

    @Selector()
    static getTrainerClients(state: TrainerStateModel) {
        return state.trainerClients;
    }

    @Action(ReadTrainersClientCount)
    readTrainer({getState, setState}: StateContext<TrainerStateModel>) {
        return this.trainerService.readTrainerClients().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                trainerClients: result,
            });
        }));
    }
}

