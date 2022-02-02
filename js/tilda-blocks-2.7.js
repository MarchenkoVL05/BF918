// Polyfill: Element.matches
if (!Element.prototype.matches) {
Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.oMatchesSelector;
}

// Polyfill: Element.closest
if (!Element.prototype.closest) {
Element.prototype.closest = function (s) {
        var el = this;
        while (el && el.nodeType === 1) {
        if (Element.prototype.matches.call(el, s)) {
                return el;
        }
        el = el.parentElement || el.parentNode;
        }
        return null;
};
}
 

function t806__init(recid) {
  t_onFuncLoad('tvote__init', function () {
          tvote__init(recid)
  });
  var testWrap = document.querySelector('#rec' + recid);
  var testContainer = testWrap.querySelector('.t806');
  var rightAnswersCount;
  var testAnswers = testWrap.querySelectorAll('.t806__answers');
  var testBlock = testWrap.querySelector('.t806__test');
  var testResultWrap = testWrap.querySelectorAll('.t806__result-wrap');
  var shareVK = testWrap.querySelector('.t806__social-btn-vk');
  var shareFB = testWrap.querySelector('.t806__social-btn-fb');
  var shareTwitter = testWrap.querySelector('.t806__social-btn-twitter');
  var rightTestAnswers = [];
  var testImgSrc = [];
  var startTitle = testWrap.querySelector('.t806__start-title').textContent;
  var startText = testWrap.querySelector('.t806__start-text').textContent;
  var siteLocation = window.location.href;
  testBlock.classList.add('t806__counter');
  testBlock.setAttribute('data-count', 0);
  for (var i = 0; i < testResultWrap.length; i++) {
        if (testResultWrap[i].querySelector('img').getAttribute('src') !== '') {
            testImgSrc.push(testResultWrap[i].querySelector('img').getAttribute('src'))
        }
  }
  if (testImgSrc.length == 1) {
        for (var i = 0; i < testResultWrap.length; i++) {
            testResultWrap[i].querySelector('img').setAttribute('src', testImgSrc[0]);
            testResultWrap[i].querySelector('.t806__result-desc').classList.remove('t806__result-desc_withoutimg');
            testResultWrap[i].querySelector('.t806__result-count, .t806__result-variant').style.color = '#ffffff';
        }
  }
  for (var i = 0; i < testAnswers.length; i++) {
        var answer = testAnswers[i].getAttribute('data-right-answer') || '';
        rightTestAnswers.push(answer.trim());
        testAnswers[i].removeAttribute('data-right-answer')
  }

  t806__changeRadio(recid, rightTestAnswers);
  t806__changeTestInput(recid);
  t806__startClickBtn(recid);
  t806__checkClickBtn(recid, rightTestAnswers);
  t806__nextClickBtn(recid);
  t806__resultClickBtn(recid);
  t806__restartClickBtn(recid, rightTestAnswers);
  if (shareVK) {
        shareVK.addEventListener('click', function () {
                t806_shareVK(recid, startTitle, siteLocation)
        });
  }
  if (shareFB) {
        shareFB.addEventListener('click', function () {
                t806_shareFB(recid, startTitle, startText, siteLocation)
        });  
  }
  if (shareTwitter) {
        shareTwitter.addEventListener('click', function () {
                t806_shareTwitter(recid, startTitle, siteLocation)
        });
  }
  t806__clearFormOnBackClick(testWrap)
}

function t806_scrollToTop() {
  var duration = 0;
  // cancel if already on top
  if (document.scrollingElement.scrollTop === 0) return;

  const totalScrollDistance = document.scrollingElement.scrollTop;
  let scrollY = totalScrollDistance, oldTimestamp = null;

  function step (newTimestamp) {
      if (oldTimestamp !== null) {
          // if duration is 0 scrollY will be -Infinity
          scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / duration;
          if (scrollY <= 0) return document.scrollingElement.scrollTop = 0;
          document.scrollingElement.scrollTop = scrollY;
      }
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

function t806__clearFormOnBackClick(testWrap) {
  window.addEventListener('pagehide', function () {
          testWrap.querySelector('.t806__input').checked != 1
  })
}

function t806__startClickBtn(test) {
  var testWrap = document.querySelector('#rec' + test);
  var questionFirst = 1;
  var testBtnStart = testWrap.querySelector('.t806__start-btn');
  testBtnStart.addEventListener('click', function (e) {
          var testStart = testBtnStart.closest('.t806__start');
          testStart.style.display = 'none';
          testStart.nextElementSibling.style.display = 'block';
          t806__showNumber(test, questionFirst);
          t806_scrollToTop(testWrap);
          if (typeof document.querySelector(".t-records").getAttribute("data-tilda-mode") == "undefined") {
                  if (window.lazy === 'y' || document.querySelector('#allrecords').getAttribute('data-tilda-lazy') === 'yes') {
                          t_onFuncLoad('t_lazyload_update', function () {
                                  t_lazyload_update()
                          })
                  }
          }
          e.preventDefault()
  })
}

function t806__toggleButton() {
        var ButtonsWrap = document.querySelector('t806__btn-wrapper');
        var next = document.querySelector('t806__btn_next');
        var check = document.querySelector('t806__btn_check');
        check.addEventListener('click', function() {
                check.classList.remove('t806__btn_show');
                next.classList.add('t806__btn_show');
        });
        t806_scrollToTop();
}

function t806__changeRadio(test, rightansw) {
        var testBlock = document.querySelector('#rec' + test);
        var testInput = testBlock.querySelectorAll('.t806__input[type="radio"]');
        var lastQuiz = testBlock.querySelectorAll('.t806__question');
        var lastQuestion = lastQuiz[lastQuiz.length - 1];
        lastQuestion.classList.add('t806__lastquestion');
        for (var i = 0; i < testInput.length; i++) {
                testInput[i].addEventListener('change', function (event) {
                        var rightAnswersCount = testBlock.querySelector('.t806__counter').getAttribute('data-count');
                        var testItem = event.target.closest('#rec' + test + ' .t806__question');
                        var testAnswers = event.target.closest('#rec' + test + ' .t806__answers');
                        var answerVote = event.target.closest('#rec' + test + ' .t806__answers').querySelector('.t806__answer .t-vote__btn-res');
                        var currentRightAnswer = rightansw[testItem.getAttribute('data-question-num') - 1];
                        if (event.target.getAttribute('type') === 'radio') {
                                var checkedRadio = event.target.value;
                                testAnswers.classList.add('t806__answers_answered');
                                if (testItem.classList.contains('t806__lastquestion')) {
                                        testAnswers.nextElementSibling.querySelector('.t806__btn_result').classList.add('t806__btn_show')
                                } else {
                                        testAnswers.nextElementSibling.querySelector('.t806__btn_next').classList.add('t806__btn_show')
                                }
                                testItem.querySelector('.t806__input').setAttribute('disabled', !0);
                                if (+checkedRadio === +currentRightAnswer) {
                                        rightAnswersCount++;
                                        testBlock.querySelector('.t806__counter').setAttribute('data-count', rightAnswersCount)
                                }
                                if (+testItem.querySelector('.t806__input:checked').value!== +currentRightAnswer) {
                                        testItem.querySelector('.t806__input:checked').closest('.t806__answer').classList.add('t806__answer_wrong')
                                }
                                testItem.querySelector('.t806__input:checked').parentNode.nextElementSibling.style.display = 'block';
                                testItem.querySelector('.t806__input[value="' + currentRightAnswer + '"]').closest('.t806__answer').classList.add('t806__answer_correct');
                                answerVote.classList.add('t806__answer-vote_show');
                                testItem.querySelector('.t806__input:checked').closest('.t806__answer_correct').classList.add('t806__answer_withoutopacity');
                                testItem.querySelector('.t806__input[type="radio"]').closest('.t806__answer_correct').classList.add('t806__answer_withoutopacity')
                        }
                })
        }
        t806_scrollToTop() 
}
    
    function t806__changeTestInput(test) {
        var testBlock = document.querySelector('#rec' + test);
        var testInput = testBlock.querySelectorAll('.t806__input[type="checkbox"]');
        var lastQuiz = testBlock.querySelectorAll('.t806__question');
        var lastQuestion = lastQuiz[lastQuiz.length - 1];
        var checkedAnswerCheck = [];
        testBlock.querySelector('.t806__answers').setAttribute('data-test-checked', '');
        lastQuestion.classList.add('t806__lastquestion');
        for (var i = 0; i < testInput.length; i++) {
                testInput[i].addEventListener('change', function (event) {
                        var testAnswers = event.target.closest('#rec' + test + ' .t806__answers');
                        if (event.target.getAttribute('type') === 'checkbox') {
                                testAnswers.nextElementSibling.querySelector('.t806__btn_check').classList.add('t806__btn_show')
                        }
                        if (event.target.getAttribute('type') === 'checkbox' && event.target.checked && checkedAnswerCheck.indexOf(event.target.value) === -1) {
                                checkedAnswerCheck.push(event.target.value)
                        }
                        if (event.target.getAttribute('type') === 'checkbox' && !event.target.checked) {
                                checkedAnswerCheck.splice(checkedAnswerCheck.indexOf(event.target.value), 1)
                        }
                        testAnswers.setAttribute('data-test-checked', checkedAnswerCheck.join(','));
                });
        }
        return checkedAnswerCheck
}
    
    function t806__checkClickBtn(test, rightansw) {
        var rightChecked = !1;
        var testBlock = document.querySelector('#rec' + test);
        var testBtnCheck = testBlock.querySelectorAll('.t806__btn_check');
        var testInput = testBlock.querySelectorAll('.t806__input');
        var checkedAnswersTruth = [];
        for (var i = 0; i < testBtnCheck.length; i++) {
                testBtnCheck[i].addEventListener('click', function (event) {
                        var rightAnswersCount = testBlock.querySelector('.t806__counter').getAttribute('data-count');
                        var testItem = event.target.closest('#rec' + test + ' .t806__question');
                        var testItemChecked = testItem.querySelectorAll('.t806__input:checked');
                        var testAnswers = event.target.closest('#rec' + test + ' .t806__question').querySelector('.t806__answers');
                        var answerVote = event.target.closest('.t806__btn-wrapper').previousElementSibling.querySelector('.t806__answer .t-vote__btn-res');
                        var checkboxAnswersArr = [];
                        var checkboxAnswers = rightansw[testItem.getAttribute('data-question-num') - 1].split(',');
                        var checkedAnswers = testAnswers.getAttribute('data-test-checked').split(',');
                        for (var i = 0; i < checkboxAnswers.length; i++) {
                                checkboxAnswersArr.push(checkboxAnswers[i])
                        }
                        testItem.querySelector('.t806__input').setAttribute('disabled', !0);
                        answerVote.classList.add('t806__answer-vote_show');
                        for (var i = 0; i < checkedAnswers.length; i++) {
                                var checkedCheckboxSort = checkedAnswers.sort();
                                var checkboxAnswersArrSort = checkboxAnswersArr.sort();
                                if (+checkedCheckboxSort[i] === +checkboxAnswersArrSort[i] && checkedCheckboxSort.length === checkboxAnswersArrSort.length) {
                                        checkedAnswersTruth.push(1)
                                } else {
                                        checkedAnswersTruth.push(0)
                                }
                        }
                        var rightChecked = checkedAnswersTruth.every(function (item) {
                                return item == 1
                        });
                        if (testItem.querySelector('.t806__input').getAttribute('type') === 'checkbox') {
                                for (var i = 0; i < checkboxAnswersArr.length; i++) {
                                        testItem.querySelector('.t806__input[value="' + +checkboxAnswersArr[i] + '"]').closest('.t806__answer').classList.add('t806__answer_correct');   
                                }
                                for (var i = 0; i < checkedAnswers.length; i++) {
                                        if (checkboxAnswersArr.indexOf(checkedAnswers[i]) === -1) {
                                                testItem.querySelector('.t806__input[value="' + +checkedAnswers[i] + '"]:checked').closest('.t806__answer').classList.add('t806__answer_wrong');
                                                testItem.querySelector('.t806__input[value="' + +checkedAnswers[i] + '"]').parentElement.nextElementSibling.style.display = '';
                                                
                                        }
                                }
                        }
                        for (var i = 0; i < testItemChecked.length; i++) {
                                if (testItemChecked[i].closest('.t806__answer_correct')) {
                                        testItemChecked[i].closest('.t806__answer_correct').classList.add('t806__answer_withoutopacity');
                                }
                        }
                        if (rightChecked) {
                                rightAnswersCount++;
                                testBlock.querySelector('.t806__counter').setAttribute('data-count', rightAnswersCount)
                        }
                        checkedAnswersTruth = [];
                        event.target.classList.remove('t806__btn_show');
                        if (testItem.classList.contains('t806__lastquestion')) {
                                event.target.closest('.t806__question').querySelector('.t806__btn_result').classList.add('t806__btn_show')
                        } else {
                                event.target.closest('.t806__question').querySelector('.t806__btn_next').classList.add('t806__btn_show')
                        }
                        testAnswers.classList.add('t806__answers_answered');
                        if (typeof document.querySelector(".t-records").getAttribute("data-tilda-mode") == "undefined") {
                                if (window.lazy === 'y' || document.querySelector('#allrecords').getAttribute('data-tilda-lazy') === 'yes') {
                                        t_onFuncLoad('t_lazyload_update', function () {
                                                t_lazyload_update()
                                        })
                                }
                        }
                        for (var i = 0; i < testItemChecked.length; i++) {
                                testItemChecked[i].parentNode.nextElementSibling.style.display = 'block';
                        }
                        t806__changeTestInput(test);
                        event.preventDefault()
                })         
        }
}


function t806__nextClickBtn(test) {
  var testBlock = document.querySelector('#rec' + test);
  var testBtnNext = testBlock.querySelectorAll('.t806__btn_next');
  var questionNumber;
  for (var i = 0; i < testBtnNext.length; i++) {
        testBtnNext[i].addEventListener('click', function (e) {
                var testItem = e.target.closest('#rec' + test + ' .t806__question');
                questionNumber = testItem.nextElementSibling.getAttribute('data-question-num');
                testItem.style.display = 'none';
                testItem.nextElementSibling.style.display = 'block';
                t806__showNumber(test, questionNumber);
                t806_scrollToTop();
                if (typeof document.querySelector(".t-records").getAttribute("data-tilda-mode") == "undefined") {
                        if (window.lazy === 'y' || $('#allrecords').getAttribute('data-tilda-lazy') === 'yes') {
                                t_onFuncLoad('t_lazyload_update', function () {
                                        t_lazyload_update()
                                })
                        }
                }
                e.preventDefault()
        })
  }
}

function t806__resultClickBtn(test) {
  var testBtnResult = document.querySelectorAll('#rec' + test + ' .t806__btn_result');
  for (var i = 0; i < testBtnResult.length; i++) {
        testBtnResult[i].addEventListener('click', function (e) {
                var testItem = e.target.closest('#rec' + test + ' .t806__question');
                testItem.style.display = 'none';
                t806_scrollToTop();
                t806__showResult(test);
                if (typeof document.querySelector(".t-records").getAttribute("data-tilda-mode") == "undefined") {
                        if (window.lazy === 'y' || document.querySelector('#allrecords').getAttribute('data-tilda-lazy') === 'yes') {
                                t_onFuncLoad('t_lazyload_update', function () {
                                        t_lazyload_update()
                                })
                        }
                }
                e.preventDefault()
        })   
  }
}

function t806__restartClickBtn(test, rightansw) {
  var testBlock = document.querySelector('#rec' + test);
  var testContainer = testBlock.querySelector('.t806');
  var testRestart = testBlock.querySelectorAll('.t806__btn_restart');
  var testItemAll = testBlock.querySelectorAll('.t806__question');
  for (var i = 0; i < testRestart.length; i++) {
        testRestart[i].addEventListener('click', function (e) {
                testBlock.querySelector('.t806__start').style.display = 'block';
                testBlock.querySelector('.t806__result').style.display = 'none';
                testBlock.querySelector('.t806__btn_next').classList.remove('t806__btn_show');
                testBlock.querySelector('.t806__btn_result').classList.remove('t806__btn_show');
                testBlock.querySelector('.t806__btn_check').classList.remove('t806__btn_show');
                testBlock.querySelector('.t806__details').style.display = 'none';
                testBlock.querySelector('.t806__answers').classList.remove('t806__answers_answered');
                testBlock.querySelector('.t806__answers').getAttribute('data-test-checked', '');
                testBlock.querySelector('.t806__answer').classList.remove('t806__answer_correct');
                testBlock.querySelector('.t806__answer').classList.remove('t806__answer_wrong');
                testBlock.querySelector('.t806__input').closest('.t806__answer').classList.remove('t806__answer_withoutopacity');
                testBlock.querySelector('.t806__input').checked = !1;
                testBlock.querySelector('.t806__input').removeAttribute('disabled');
                testBlock.querySelector('.t806__answer .t-vote__btn-res').classList.remove('t806__answer-vote_show');
                document.querySelector('#rec' + test + ' .t806__counter').setAttribute('data-count', 0);
                testBlock.querySelector('.t806__number').textContent = 1 + '/' + testItemAll.length;
                if (testContainer.classList.contains('t806__test-reload')) {
                        document.location.reload(!0)
                }
                e.preventDefault()
        })
  }
}

function t806__showResult(test) {
  var testBlock = document.querySelector('#rec' + test);
  var testContainer = testBlock.querySelector('.t806');
  var fullResult = testBlock.querySelectorAll('.t806__result');
  var startImg = testBlock.querySelector('.t806__start-img img');
  var fullResultLength = fullResult.length;
  var rightAnswersCount = document.querySelector('#rec' + test).querySelector('.t806__counter').getAttribute('data-count');
  var testItemAll = document.querySelectorAll('#rec' + test + ' .t806__question');
  var resultCount = document.querySelectorAll('#rec' + test + ' .t806__result .t806__result-count');
  var resultPercent = rightAnswersCount != 0 ? rightAnswersCount / testItemAll.length * 100 : 0;
  if (testContainer.classList.contains('t806__result-new-calc')) {
          if (Math.floor(resultPercent) !== resultPercent) {
                  resultPercent = resultPercent.toFixed(3)
          }
  }
  for (var i = 0; i < resultCount.length; i++) {
      resultCount[i].textContent = rightAnswersCount + '/' + testItemAll.length;
  }
  t806__openResultWrapper(testContainer, resultPercent, testBlock, fullResultLength);
  var resultData = [];
  for (var i = 0; i < fullResult.length; i++) {
    if (fullResult[i].style.display === 'block') {
        resultData[0] = fullResult[i].querySelector('.t806__result-variant').textContent
        resultData[1] = fullResult[i].querySelector('.t806__result-count').textContent;
        resultData[2] = '';
        var img = fullResult[i].querySelector('.t806__result-wrap img');
        if (testContainer.classList.contains('t806__test-reload')) {
                if (img.length != 0) {
                        if (typeof window.lazy !== 'undefined') {
                                resultData[2] = img.getAttribute('data-original') || img.getAttribute('src')
                        } else {
                                resultData[2] = img.getAttribute('src')
                        }
                }
                if (img.length == 0 && startImg.length != 0) {
                        if (typeof window.lazy !== 'undefined') {
                                resultData[2] = startImg.getAttribute('data-original') || img.getAttribute('src')
                        } else {
                                resultData[2] = startImg.getAttribute('src')
                        }
                }
        }
        if (!testContainer.classList.contains('t806__test-reload')) {
                if (img.length != 0) {
                        resultData[2] = img.getAttribute('src')
                }
                if (img.length == 0 && startImg.length != 0) {
                        resultData[2] = startImg.getAttribute('src')
                }
        }
        resultData[3] = fullResult[i].getAttribute('data-quiz-result-number')
}
  }
  return resultData
}

function t806__openResultWrapper(testContainer, resultPercent, testBlock, fullResultLength) {
  if (testContainer.classList.contains('t806__result-new-calc')) {
          if (resultPercent <= 100 * 1 / fullResultLength) {
                  testBlock.querySelector('.t806__result_1').style.display = 'block';
                  return
          }
          for (var i = 0; i < fullResultLength; i++) {
                  var minResult = 100 * (i + 1) / fullResultLength;
                  var maxResult = 100 * (i + 2) / fullResultLength;
                  minResult = Math.floor(minResult) == minResult ? minResult : minResult.toFixed(3);
                  maxResult = Math.floor(maxResult) == maxResult ? maxResult : maxResult.toFixed(3);
                  if (resultPercent >= minResult && resultPercent <= maxResult) {
                          testBlock.querySelector('.t806__result_' + (i + 2)).style.display = 'block';
                          return
                  }
          }
          if (resultPercent > 100 * (fullResultLength - 1) / fullResultLength) {
                  testBlock.querySelector('.t806__result_' + fullResultLength).style.display = 'block';
                  return
          }
  } else {
          if (resultPercent <= 100 * 1 / fullResultLength) {
                  testBlock.querySelector('.t806__result_1').style.display = 'block'
          }
          for (var i = 0; i < fullResultLength; i++) {
                  if (resultPercent > 100 * (i + 1) / fullResultLength && resultPercent <= 100 * (i + 2) / fullResultLength) {
                          testBlock.querySelector('.t806__result_' + (i + 2)).style.display = 'block'
                  }
          }
          if (resultPercent > 100 * (fullResultLength - 1) / fullResultLength) {
                  testBlock.querySelector('.t806__result_' + fullResultLength).style.display = 'block'
          }
  }
}

function t806__showNumber(test, number) {
  var testItemNumber = document.querySelectorAll('#rec' + test + ' .t806__number');
  var testItemAll = document.querySelectorAll('#rec' + test + ' .t806__question');
  for (var i = 0; i < testItemNumber.length; i++) {
        testItemNumber[i].innerHTML = '<span>' + number + '</span>' + '<span>/</span>' + '<span>' + testItemAll.length + '</span>';
  }
}

function t806_changeShareFBUrl(siteLocation, searchUrl) {
  var url = siteLocation.split('?')[0] + '?';
  var searchParametrs = decodeURIComponent(searchUrl.substring(1));
  var params = searchParametrs.split('&');
  for (var i = 0; i < params.length; i++) {
  if (params[i].indexOf('fb_action_ids') == -1 && params[i].indexOf('fb_action_types') == -1 && params[i].indexOf('result') == -1) {
    url = url + params[i] + '&'
    }
  }
  url = url.substring(0, url.length - 1);
  return url
}

function t806_shareVK(recid, ptitle, purl) {
  var dataForShare = t806__showResult(recid);
  var text = dataForShare[0];
  var count = dataForShare[1];
  var slash = (dataForShare[2] || "").indexOf('/') == 0 ? '' : '/';
  var urlPathname = window.location.pathname.length > 1 ? window.location.pathname : '';
  var img = (dataForShare[2] || "").indexOf('://') != -1 ? dataForShare[2] : window.location.protocol + '//' + window.location.host + urlPathname + slash + dataForShare[2];
  var resultNumber = dataForShare[3];
  var idUrl = recid + resultNumber + 'vk';
  var urlValueImg = 'https://vote.tildacdn.com/vote/2/share/index.php?text=' + text;
  urlValueImg += '&result=' + count;
  if ((dataForShare[2] || "").length > 0) {
          urlValueImg += '&url=' + img
  }
  urlValueImg += '&id=' + idUrl;
  urlValueImg += '&social=vk' + '&name=' + ptitle;
  var request = new XMLHttpRequest();
  request.open('GET', urlValueImg, true);
  request.onload = function(data) {
        if (this.status >= 200 && this.status < 400) {
          var urlImg = (data.responseJSON.url || '').replace(/\?.*/, '');
          var shareUrl = window.location.href.indexOf('#') != -1 ? purl.split('#')[0] : purl;
          url = 'http://vkontakte.ru/share.php?url=' + shareUrl + '&title=' + ptitle + '&description=' + ptitle + '&image=' + urlImg + '&noparse=true';
          t806__openPopup(url)
          var resp = this.response;
        }
  };
  request.onerror = function(e) {
        console.log('t806 error: ' + e)
  };
  request.send();
}

function t806_shareFB(recid, ptitle, pdescr, purl) {
  var dataForShare = t806__showResult(recid);
  var text = dataForShare[0];
  var count = dataForShare[1];
  var slash = (dataForShare[2] || "").indexOf('/') == 0 ? '' : '/';
  var urlPathname = window.location.pathname.length > 1 ? window.location.pathname : '';
  var img = (dataForShare[2] || "").indexOf('://') != -1 ? dataForShare[2] : window.location.protocol + '//' + window.location.host + urlPathname + slash + dataForShare[2];
  var resultNumber = dataForShare[3];
  var idUrl = recid + resultNumber + 'fb';
  var param = count.substring(0, count.indexOf('/')) + count.substring(count.indexOf('/') + 1);
  var urlValueImg = 'https://vote.tildacdn.com/vote/2/share/index.php?text=' + text;
  urlValueImg += '&result=' + count;
  if ((dataForShare[2] || "").length > 0) {
          urlValueImg += '&url=' + img
  }
  urlValueImg += '&id=' + idUrl;
  urlValueImg += '&social=fb' + '&name=' + ptitle;
  var request = new XMLHttpRequest();
  request.open('GET', urlValueImg, true);
  request.onload = function(data) {
        if (this.status >= 200 && this.status < 400) {
                var urlImg = data.responseJSON.url;
                var searchUrl = window.location.search;
                purl = (searchUrl !== '' ? t806_changeShareFBUrl(purl, searchUrl) : purl) + '?result=' + param;
                FB.ui({
                        method: 'share_open_graph',
                        action_type: 'og.shares',
                        action_properties: JSON.stringify({
                                object: {
                                        'og:url': purl
                                }
                        })
                })
          var resp = this.response;
        }
      };
  request.onerror = function(e) {
        console.log('t806 error: ' + e);
  };
  request.send();
}

function t806_shareTwitter(recid, ptitle, purl) {
  var dataForShare = t806__showResult(recid);
  var testWrap = document.querySelector('#rec' + recid);
  var testContainer = testWrap.querySelector('.t806');
  var text = dataForShare[0];
  var count = dataForShare[1];
  var img = dataForShare[2];
  var resultCount = count.substring(0, count.indexOf('/'));
  var allCount = count.substring(count.indexOf('/') + 1)
  var result;
  if (testContainer.classList.contains('t806__ru')) {
          result = 'Мой результат: ' + resultCount + ' из ' + allCount + '. ' + text
  }
  if (testContainer.classList.contains('t806__en')) {
          result = 'My result: ' + resultCount + ' out of ' + allCount + '. ' + text
  }
  purl = purl.replace(/&/g, '%26');
  url = 'https://twitter.com/share?url=' + purl + '&text=' + result;
  url = encodeURI(url);
  t806__openPopup(url)
}

function t806__openPopup(url) {
  window.open(url, '', 'toolbar=0,status=0,width=626,height=436')
}