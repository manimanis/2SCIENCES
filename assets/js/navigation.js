/**
 * Question Navigation Engine - Vue / Vanilla JS Edition
 */
document.addEventListener('DOMContentLoaded', () => {
  const qNav = document.getElementById('question-navigation');
  if (!qNav) return;
  
  const ul = qNav.querySelector('ul.pagination');
  const questions = document.querySelectorAll('.question');
  const topics = document.querySelectorAll('.topic');
  if (!ul || !questions.length) return;

  function displayQuestion(index) {
    topics.forEach(t => t.style.display = 'none');
    questions.forEach(q => q.style.display = 'none');
    
    const targetQ = questions[index];
    if (targetQ) {
      targetQ.style.display = 'block';
      const topic = targetQ.closest('.topic');
      if (topic) topic.style.display = 'block';
    }
    
    const lis = qNav.querySelectorAll('li');
    lis.forEach((li, idx) => {
      if (idx === index) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  }

  questions.forEach((qElem, index) => {
    const isAnswered = qElem.classList.contains('text-success');
    const li = document.createElement('li');
    li.className = 'page-item';
    
    const a = document.createElement('a');
    a.className = 'page-link';
    a.href = '#q_' + index;
    a.innerHTML = isAnswered ? `<u>${index + 1}</u>` : `${index + 1}`;
    
    a.addEventListener('click', (e) => {
      e.preventDefault();
      displayQuestion(index);
    });
    
    li.appendChild(a);
    ul.appendChild(li);
  });

  displayQuestion(0);
});