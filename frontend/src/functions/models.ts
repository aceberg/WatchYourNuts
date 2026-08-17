export interface Conf {
	Host:	   string;
	Port:	   string;
	Theme:	   string;
	Color:     string;
};

export interface Food {
	ID:    number;
	Date:  string;
	Name:  string;
	Group: string;
	Tag:   string;
	Fat:   number;
	Prot:  number;
	Carb:  number;
	Kcal:  number;
	Size:  number;
	Link:  string;
}

export const emptyFood:Food = {
	ID:   0,
	Date: "",
	Name: "",
	Group: "",
	Tag:  "",
	Fat:  0,
	Prot: 0,
	Carb: 0,
	Kcal: 0,
	Size: 0,
	Link: "",
};

export const emptyConf:Conf = {
	Host:	 "",
	Port:	 "",
	Theme:	 "",
	Color:   "",
};