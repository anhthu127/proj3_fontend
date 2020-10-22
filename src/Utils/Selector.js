import { Select } from "antd";
import React, { } from 'react'
const { Option } = Select;

function Selector(props) {

    const handleChange = (value) => {
        props.getData(value)
    }
    return (
        <>
            <Select defaultValue={props.title} style={{ width: '150px' }} onChange={handleChange}>
                {(props.data.length > 0) ?
                    (props.data.map((value, i) => {
                        return (
                            <Option key={`child-distri-${value.code}`} value={value.code}>
                                {value.name}

                            </Option>
                        );
                    })) : (
                        <Option>Không có dữ liệu</Option>
                    )
                }
            </Select>
        </>
    )
}

export default Selector;