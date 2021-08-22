import React from 'react'
import { Result, Button } from 'antd';

export const NotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Упс... Страница, которую вы запршиваете не существует"
            extra={<Button href='/' type="primary">На главную</Button>} />
    )
}