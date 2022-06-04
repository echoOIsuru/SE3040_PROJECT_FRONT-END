import React, { useEffect, useState } from 'react'

const ResearchFields = ({ data, handleOnChange }) => {


    const [selected, setSelected] = useState([])
    const [unSelected, setUnSelected] = useState("")

    useEffect(() => {
        // console.log(selected)
        let num = 0;

        for (let x of selected) {
            if (x == unSelected) {
                num++
                // console.log(num)
            }
        }

        if (num >= 2) {
            let temp = [];
            for (let x of selected) {
                if (x == unSelected)
                    continue
                temp.push(x)
            }
            setSelected(temp)
            // console.log(temp, "TEMP")
        }
        handleOnChange(selected)



    }, [selected])

    const handleFiled = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUnSelected(value)
        setSelected(values => ([...values, value]))

    }


    return (
        <div>
            <div className="form-check" onChange={handleFiled}>
                {
                    data.map((value, index) => {
                        return (
                            <div key={index + 1}>

                                <input className="form-check-input" type="checkbox" value={value.fieldName} name={index + 1} id={value.fieldName} />
                                <label className="form-label">
                                    {value.fieldName}
                                </label>
                                <br />

                            </div>
                        )
                    })
                }
            </div>

        </div >
    )
}

export default ResearchFields