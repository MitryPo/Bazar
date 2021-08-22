import React, { useState } from 'react'
import { Drawer, Button } from 'antd';
import Categories from './Categories'



export const CategoryMenu = () => {

	const [visible, setVisible] = useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<Button block onClick={showDrawer}>
				Категории
      		</Button>
			<Drawer
				// title="Категории товаров"
				placement="top"
				closable={false}
				onClose={onClose}
				visible={visible}
				height={'55%'}
			>
				<Categories/>
			</Drawer>
		</>
	)
}
