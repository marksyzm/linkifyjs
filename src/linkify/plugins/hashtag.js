/**
	Quick Hashtag parser plugin for linkify
*/
export default function hashtag(linkify) {
	let TT = linkify.scanner.TOKENS; // Text tokens
	let MT = linkify.parser.TOKENS; // Multi tokens
	let MultiToken = MT.Base;
	let S_START = linkify.parser.start;
	let S_HASH, S_HASHTAG;

	function HASHTAG(value) {
		this.v = value;
	}

	linkify.inherits(MultiToken, HASHTAG, {
		type: 'hashtag',
		isLink: true
	});

	S_HASH = new linkify.parser.State();
	S_HASHTAG = new linkify.parser.State(HASHTAG);

	S_START.on(TT.POUND, S_HASH);
	S_HASH.on(TT.DOMAIN, S_HASHTAG);
	S_HASH.on(TT.TLD, S_HASHTAG);
}
