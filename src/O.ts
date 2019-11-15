interface O {
}

class Data implements O {
	private _value: any;
	get value(){ return this._value};

	constructor(value?: any) {
		this._value = value;
	}

	public static EMPTY = new Data();
}


class Label implements O {
	public static list: {[any:string]: any} = {};

	private name: string;

	equals: [O,boolean][] = [];

	constructor(label: string){
		Label.list[label] = Data.EMPTY;
		this.name = label;
	}
	get value(){
		return Label.list[this.name];

	}
}


const _Eq = (eq: boolean, ...args: O[][]) =>{
	const Labels = args[0].filter(v=>(v instanceof Label)) as Label[];
	const Datas = args[0].filter(v=>!(v instanceof Label));
	if (Labels.length<1) throw new TypeError("Need at least one Label");
	Labels.forEach(v1=>args.forEach(v2=>v1.equals.push([v2,eq])));
};

export const Ne = (...args: O[]) => {
	_Eq(false, args);
};

export const Eq = (...args: O[]) => {
	_Eq(true, args);
};

export const L = (label: string): Label => {
	if (Label.list[label]){
		return Label.list[label];
	}
	return new Label(label);
};












