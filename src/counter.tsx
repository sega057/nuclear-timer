import * as React from "react";
import {ReducerWithoutAction} from "react";


export type ActionTick = {
    type: "tick",
}
export type ActionReset = {
    type: "reset",
}
export type Action = ActionReset | ActionTick;
export type Dispatch = React.Dispatch<Action>;
export type Reducer = React.Reducer<State, Action>& ReducerWithoutAction<State>;
export const Reducer = (timeout: number): Reducer  =>
    (prevState: State, action?: Action): State => {
        if (action === undefined) {
            return prevState;
        }
        switch (action.type) {
            case "tick":
                return prevState - 1;
            case "reset":
                return timeout;
        }
    };
export const useReducer = (timeout: number): [State, Dispatch] => {
    const reducer = Reducer(timeout);
    return React.useReducer(reducer, timeout, reducer);
};
export const useEffect = (dispatch: Dispatch, interval: number): void => {
    return React.useEffect(() => {
        const id = setInterval(() => dispatch({type: "tick"}), interval);
        console.log(`Interval Created: ${id}`);
        return () => clearInterval(id);
    }, [dispatch, interval]);
};
export type State = number;
export const useState = (timeout: number, interval: number): ReturnType<typeof useReducer> => {
    const [state, dispatch] = useReducer(timeout);
    useEffect(dispatch, interval);
    return [state, dispatch];
};

export type CounterProps = { timeout: number, interval: number };

export const Counter: React.FC<CounterProps> = ({timeout, interval}) => {
    const [state, dispatch] = useState(timeout, interval);
    return (
        <>
            <h4>
                Time to Death: {state}
                <Button dispatch={dispatch}/>
                <details>
                    Interval: {Math.round(interval / 1000)} s.
                </details>
            </h4>
        </>
    );
};


export const Button: React.FC<{ dispatch: Dispatch } & Omit<React.HTMLProps<HTMLButtonElement>, "onClick">> =
    ({dispatch, ...childProps}) => {
        const handleClick = React.useCallback(() => dispatch({type: "reset"}), [dispatch]);
        return (
            <button{...childProps} type={"button"} aria-label="GreenPeace" onClick={handleClick}>
                Postpone Battle
            </button>
        )
    };

const timeout = Math.round(30 + Math.random() * 30);
const interval = 500 + Math.random() * 500;

export const CounterLite: React.FC<{}> = () => {
    const [state, setState] = React.useState(timeout);

    React.useEffect(() => {
        if (state <= 0) {
            return;
        }
        const id = setTimeout(() => {
            setState(state - 1);
        }, interval);
        console.log(`Timeout Created.`);
        return () => clearTimeout(id);
    }, [state, setState]);

    return <h2 style={{color: 'tomato'}}>
        {state > 0 ? `Nuclear Attack to USSR: ${state}` : `BOOM`}
    </h2>;
};
