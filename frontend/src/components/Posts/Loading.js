import React from 'react'
import { Spin } from 'antd';


export default function Loading(Component) {
    return function LoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />
        return (
            <div className='container' style={{paddingTop: '3em', textAlign: 'center'}}>
                <Spin/>
            </div>
        )
    }
}
