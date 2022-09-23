const operatorTypes = [
	"OPERATOR",
	"ADMIN",
];

const orderStatus = [
	"EXPECTING_PAYMENT", // 0
	"CONFIRMED", // 1
	"EM_PREPARO", // 2 // TODO: nome em inglês
	"AWAITING_DELIVERY", // 3
	"DELIVERED", // 4
	"CANCELLED", // 5
];

export {
	operatorTypes,
	orderStatus,
};
