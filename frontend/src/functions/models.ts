export interface Conf {
	Host:	   string;
	Port:	   string;
	Theme:	   string;
	Color:     string;
};

export interface Entry {
	ID:    number;
	Date:  string;
	Name:  string;
	Fat:   number;
	Prot:  number;
	Carb:  number;
	Kcal:  number;
	Size:  number;
	Meal:  string;
};

export interface Food {
	ID:    number;
	Name:  string;
	Group: string;
	Fat:   number;
	Prot:  number;
	Carb:  number;
	Kcal:  number;
	Size:  number;
	Link:  string;
}

export const emptyEntry:Entry = {
	ID:   0,
	Date: "",
	Name: "",
	Meal: "",
	Fat:  0,
	Prot: 0,
	Carb: 0,
	Kcal: 0,
	Size: 0,
};

export const emptyConf:Conf = {
	Host:	 "",
	Port:	 "",
	Theme:	 "",
	Color:   "",
};