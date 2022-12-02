export type Project = {
	comments_count: number;
	completed?: Date;
	completed_day_set?: boolean;
	craft_id?: number;
	craft_name?: string;
	created_at: Date;
	ends_per_inch?: number;
	favorites_count: number;
	first_photo?: Photo;
	gauge_divisor?: number;
	gauge?: number;
	gauge_pattern?: string;
	gauge_repeats?: number;
	id: number;
	links?: Object;
	made_for?: string;
	made_for_user_id?: number;
	name: string;
	pattern_id?: number;
	pattern_name?: string;
	permalink: string;
	photos_count: number;
	progress?: number;
	project_status_changed?: boolean;
	project_status_id?: number;
	rating?: number;
	row_gauge?: number;
	size?: string;
	started?: Date;
	started_day_set: boolean;
	status_name?: string;
	tag_names?: Array<string>;
	updated_at: Date;
};

export type Photo = {
	medium2_url: string; // 640px
	medium_url: string; // 500px
	small2_url: string; //320px
	small_url: string; // 240px
	square_url: string; // 75px
	thumbnail_url: string; //100px
	y_offset?: number;
	x_offset?: number;
};
