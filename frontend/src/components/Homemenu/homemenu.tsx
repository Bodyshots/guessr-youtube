"use client";

import IconButton from './HomemenuItem/homemenuitem';
import { GameModeMenuItems } from '@/constants/menuitems';

const HomeMenu = () => {

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-yt_font">
			{GameModeMenuItems.map((mode) => (
				<IconButton
					key={mode.title}
					icon={mode.icon as any}
					btn_label={mode.title}
					gameMode={mode.title}
					redirect_path={mode.url}
					short_desc={mode.description}
					tooltip_desc={mode.tooltipDesc}
				/>
			))}
		</div>
	)
}

export default HomeMenu;