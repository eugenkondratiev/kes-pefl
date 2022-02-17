import React, { useState } from 'react';
import StyledButton from '../StyledButton';
import stl from "./MultiPageControls.module.scss"

const MAX_STEPS = 4;
const MIN_STEPS = 1;
const PREV_BUTTON_CAPRION = "< Назад"
const NEXT_BUTTON_CAPRION = "Дальше >"

function MultiPageControls(props) {

    const [steps, setSteps] = useState({ step: MIN_STEPS });

    const _next = () => {
        setSteps((prevSteps) => {
            const newStep = prevSteps.step === MAX_STEPS ? MAX_STEPS : prevSteps.step + 1
            return {
                ...prevSteps,
                step: newStep
            }
        })
    }
    const _prev = () => {
        setSteps((prevSteps) => {
            const newStep = prevSteps.step === MIN_STEPS ? MIN_STEPS : prevSteps.step - 1
            return {
                ...prevSteps,
                step: newStep
            }
        })
    }

    return (
        <div className={stl.root}>
            <div className={stl.mainWrapper}>
                {steps.step}
            </div>
            <div
                className={stl.buttonWrapper}
                style={steps.step === MIN_STEPS
                    ? { 'justify-content': "flex-end" }
                    : steps.step === MAX_STEPS
                        ? { 'justify-content': "flex-start" }
                        : { 'justify-content': "space-between" }
                }
            >
                {steps.step !== MIN_STEPS &&
                    <StyledButton onClick={() => _prev()}>
                        {PREV_BUTTON_CAPRION}
                    </StyledButton>}
                {steps.step !== MAX_STEPS &&
                    <StyledButton onClick={() => _next()}>
                        {NEXT_BUTTON_CAPRION}
                    </StyledButton>
                }
            </div>
        </div>
    );
}

export default MultiPageControls;