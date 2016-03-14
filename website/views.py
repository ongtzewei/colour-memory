from django.shortcuts import render

def home(request, *args, **kwargs):
    context = {}
    return render(request, 'website/home.html', context)