const operatorTypes = [
	"OPERATOR",
	"ADMIN",
];

const orderStatus = [
	"EXPECTING_PAYMENT",
	"CONFIRMED",
	"EM_PREPARO", // TODO: nome em inglês
	"AWAITING_DELIVERY",
	"DELIVERED",
	"CANCELLED",
];

export {
	operatorTypes,
	orderStatus,
};
