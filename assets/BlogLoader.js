let blogSection = document.querySelector(".blog");

function getRSSFeed() {
    let feedRequest = new XMLHttpRequest();
   
    if (!feedRequest) {
        alert('Cannot create an XMLHTTP instance');
        return false;
    }
    feedRequest.onreadystatechange = loadData;
    feedRequest.open('GET', 'https://victorjperez.github.io/Personal-Blog/feed', true);
    feedRequest.send();

    function loadData() {
        try {
            if (feedRequest.readyState === XMLHttpRequest.DONE) {
                if (feedRequest.status === 200) {
                    let responseData = feedRequest.responseXML;
                    handleData(responseData);
                } else {
                    console.log('Request failed,nothing returned');
                }
            }
        } catch(e) {
            console.log('Exception: ' + e.description);
        }
    }
}

function handleData(data) {
    let articles = data.getElementsByTagName('entry');

    for (let index = 0; index < 5; index++) {
        let postdata = articles[index];
        let blogUrl = (postdata.getElementsByTagName('id'))[0].textContent;
        let thumbnailUrl = (postdata.getElementsByTagName('media:thumbnail'))[0].getAttribute('url');
        let summaryText = postdata.getElementsByTagName('summary')[0].textContent;
        
        thumbnailUrl = thumbnailUrl.substring(45, thumbnailUrl.length);
        summaryText = summaryText.substring(0, 150);
        summaryText = summaryText.substring(0, summaryText.lastIndexOf('.')+1);

        let postImg = document.createElement('img');
        let postLink = document.createElement('a');
        let postTitle = document.createElement('h2');
        let postSummary = document.createElement('p');

        let postContent = document.createElement('div');
        postContent.setAttribute('class', "blog__post--content");
        
        postImg.setAttribute('src', 'https://victorjperez.github.io/Personal-Blog/assets/img/' + thumbnailUrl);
        postLink.setAttribute('href', blogUrl);
        postLink.innerText = postdata.firstChild.textContent;
        postSummary.innerText = summaryText;
        postTitle.appendChild(postLink);

        let postTidbit = document.createElement('div');
        postTidbit.setAttribute('class', "blog__post");
        postTidbit.appendChild(postImg)
        postContent.appendChild(postTitle);
        postContent.appendChild(postSummary);
        postTidbit.appendChild(postContent);
        blogSection.appendChild(postTidbit);
    }
}

getRSSFeed();