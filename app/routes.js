module.exports = function(app, config, mcConfig) {
	// server routes ===========================================================
	// handle things like api calls
	app.get('/api', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	app.get('/api/recommendations', function(req, res) {
		var songs = [];
		songs.push({"title":"Right There","artist":"Nicole Scherzinger","preview_url":"https://p.scdn.co/mp3-preview/95ed861a5843a8c5d19199fe87cf2e3004f706bb","image_small":"https://i.scdn.co/image/40537af56e0722754ec1d72cafefa496f6c67afd","image_medium":"https://i.scdn.co/image/f0976edb389fee0f83741c7df6271da3a0fb1fcb","image_large":"https://i.scdn.co/image/f33f69e26708e2ab74c277a7b5b7db5f6ed4d1e4","open_url":"https://open.spotify.com/track/1gImqRKHoOlLYHRkwPmhiG","song_id":"54dd0bc8a57fa90c00770542"});
		songs.push({"title":"Sunshine & Whiskey","artist":"Frankie Ballard","preview_url":"https://p.scdn.co/mp3-preview/04cb04399c8ec76ae3f837f753fae2aed6349c14","image_small":"https://i.scdn.co/image/40016fbf94702c7543c79a06f86d96055da011ed","image_medium":"https://i.scdn.co/image/e091609191797a58b9ef2820ed59ff4d31f7cff9","image_large":"https://i.scdn.co/image/ffd9de76f360379dbd4f490cbe8715f148a4bf4a","open_url":"https://open.spotify.com/track/6aNwDe5YH5YUPlpHkku52w","song_id":"54dd0bc8a57fa90c00770576"});
		songs.push({"title":"Hurricane","artist":"Ms Mr","preview_url":"https://p.scdn.co/mp3-preview/e83b1e0b26cf89398fa5d1f3dc472fb2abd8d521","image_small":"https://i.scdn.co/image/555b4eeecd4b9c4cb62cab946f1ddbdcd4c51c1a","image_medium":"https://i.scdn.co/image/36d0aa00b0d227c6fe9b885eafd52a207aef5fe7","image_large":"https://i.scdn.co/image/460f5bd64ff69f2857f30c2abe39948413e520de","open_url":"https://open.spotify.com/track/6gjIUT8LJkehlgQeWNHCuC","song_id":"54dd0bc8a57fa90c0077055f"});
		songs.push({"title":"You Haven't Told Me Anything","artist":"Keane","preview_url":"https://p.scdn.co/mp3-preview/c28cbd0660406b75f2257c413f4d7f7a4474fc47","image_small":"https://i.scdn.co/image/9d4dd4c0ab441013bfabd945de9fc1b9fbe55625","image_medium":"https://i.scdn.co/image/cbeaf679afb575f0b17b8191ad3c0ecae955ef77","image_large":"https://i.scdn.co/image/e9def991ac257192e648409a66e570ea553eeab7","open_url":"https://open.spotify.com/track/3QJfLQC6s0Nw8aNmhmUGi3","song_id":"54dd0bc8a57fa90c007704cc"});
		songs.push({"title":"New In Town","artist":"Little Boots","preview_url":"https://p.scdn.co/mp3-preview/b236fd1d6d3373ce99c6ed47ed7c30a2fac528d5","image_small":"https://i.scdn.co/image/567c0f4c54bb2aadacea8b30da3cd474baa14333","image_medium":"https://i.scdn.co/image/1104df5a1660679715a03363704aeed0b44f9fae","image_large":"https://i.scdn.co/image/0672c10fe23eb748e14d65f33f7731618de3e82f","open_url":"https://open.spotify.com/track/1e0fet92fkQCHyrYTXqLG9","song_id":"54dd0bc8a57fa90c007705d3"});
		songs.push({"title":"Pretty Hurts","artist":"Beyoncé","preview_url":"https://p.scdn.co/mp3-preview/f207cc7bccfa09fcd3a17a4e1dc9046700099513","image_small":"https://i.scdn.co/image/e46e4a8004c808216081adddee55176ff48523b4","image_medium":"https://i.scdn.co/image/89c0149522d0ca70ceda7646540199e74f774dbe","image_large":"https://i.scdn.co/image/b32e310b9cfa05c893e9060c33b3176fd790857e","open_url":"https://open.spotify.com/track/5L28Ji31tIWYMPHL9jxVZC","song_id":"54dd0bc8a57fa90c007704f7"});
		songs.push({"title":"Astronomy","artist":"Blue Öyster Cult","preview_url":"https://p.scdn.co/mp3-preview/cda70f28e5e3383229c0be6fce4eba1ba2172bc7","image_small":"https://i.scdn.co/image/29c39e5915ce178251fff597fe0e525d87130ef0","image_medium":"https://i.scdn.co/image/bbe25ff22da6a94b1e42e6047b93e3ca734966b6","image_large":"https://i.scdn.co/image/55ee6b8e416288e17a29fe91eea6ec4d7faffebd","open_url":"https://open.spotify.com/track/6bespCCWfoSOLVbW4KbI13","song_id":"54dd0bc8a57fa90c0077063c"});
		songs.push({"title":"Never Enough","artist":"L.A. Guns","preview_url":"https://p.scdn.co/mp3-preview/6a0582c075b6230b641a06c9544d74fbf20dd19f","image_small":"https://i.scdn.co/image/8414c9283eaba04b3701b7efd6f1a313d8036e7f","image_medium":"https://i.scdn.co/image/cc0dda874005dde19b7286c35f587db53f4c6694","image_large":"https://i.scdn.co/image/e599801c86d700fed23ee22c5fed18429581d33d","open_url":"https://open.spotify.com/track/5ohXkOxU6YUW3gEDufETTQ","song_id":"54dd0bc8a57fa90c007704c3"});
		songs.push({"title":"Red Light","artist":"David Nail","preview_url":"https://p.scdn.co/mp3-preview/132f0d251b105617ad70994f1177a27aff76df4a","image_small":"https://i.scdn.co/image/2016e377d0d70567cd0a7803706ad491c8ca84e5","image_medium":"https://i.scdn.co/image/83d93c90db5f9d37c1265cde3569a4ebbaafd378","image_large":"https://i.scdn.co/image/6a0bf4b26a1ce8be1a36c7e7a7a720b4be0d0414","open_url":"https://open.spotify.com/track/3yrSLMrJgdeeXGiDxynv05","song_id":"54dd0bc8a57fa90c00770590"});
		songs.push({"title":"Down On Me","artist":"Jeremih","preview_url":"https://p.scdn.co/mp3-preview/f71786bdb8dd7f2ccd7505e919cb72ea4bb0df10","image_small":"https://i.scdn.co/image/c1a82033d85f518e61a0624c96f0fc0ddfa2f2a0","image_medium":"https://i.scdn.co/image/3464917116ef04e7e8c9c5d7fedf911be8505225","image_large":"https://i.scdn.co/image/13723a1297917911b8242f17a67f9f48f2f99d90","open_url":"https://open.spotify.com/track/0wpbHnOW0zVUtV10LSj9c9","song_id":"54dd0bc8a57fa90c00770604"});
		res.json( songs );
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./frontend/index.html');
	});

};