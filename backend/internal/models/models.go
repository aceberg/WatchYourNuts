package models

// Conf - app config
type Conf struct {
	Host     string
	Port     string
	Theme    string
	Color    string
	DirPath  string
	ConfPath string
	DBPath   string
	Version  string
	Protein  int64
	Fat      int64
	Carbs    int64
	Calories int64
}

// Food is one food item
type Food struct {
	ID    int64 `gorm:"primaryKey"`
	Date  string
	Name  string
	Group string
	Tag   string
	Fat   int64
	Prot  int64
	Carb  int64
	Kcal  int64
	Size  int64
	Link  string
}
